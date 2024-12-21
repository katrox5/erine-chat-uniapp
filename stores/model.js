import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { modelAuth, modelList, modelOptions } from '@/adapters'

export const useModelStore = defineStore('model', () => {
  const defaultModel = modelList[0]

  const currentModel = ref()
  const modelData = ref({
    auth: {},
    options: {},
    messages: [],
  })

  watch(currentModel, () => {
    currentModel.value &&
      uni.setStorage({
        key: 'modelSelected',
        data: currentModel.value,
      })
    // 加载模型(默认)数据
    loadModelData(currentModel.value) || loadDefaultModelData(currentModel.value)
  })

  watch(modelData, () => saveModelData(currentModel.value, modelData.value), {
    deep: true,
  })
  ;(function () {
    // 读取已选的模型，若不存在则使用默认模型
    const model = uni.getStorageSync('modelSelected') || defaultModel
    currentModel.value = modelList.includes(model) ? model : defaultModel
  })()

  /**
   * @param {String} modelName
   */
  function loadDefaultModelData(modelName) {
    const auth = modelAuth.get(modelName)
    for (const item of auth) {
      modelData.value.auth[item.key] = ''
    }
    const options = modelOptions.get(modelName)
    for (const item of options) {
      modelData.value.options[item.key] = item.default
    }
  }

  /**
   * @param {String} modelName
   */
  function loadModelData(modelName) {
    let tempModelData = uni.getStorageSync(modelName)
    if (tempModelData) {
      modelData.value = tempModelData
      return true
    }
    return false
  }

  /**
   * @param {String} modelName
   * @param {Object} modelData
   */
  function saveModelData(modelName, modelData) {
    uni.setStorage({
      key: modelName,
      data: modelData,
    })
  }

  return {
    currentModel,
    modelData,
  }
})
