import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { modelAuth, modelList, modelOptions } from '@/adapters'

export const useModelStore = defineStore('model', () => {
  const defaultModel = modelList[0]

  const currentModel = ref()
  const modelData = ref()

  watch(currentModel, () => {
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
    const tempModelData = {
      auth: {},
      options: {},
      messages: [],
    }
    const auth = modelAuth.get(modelName)
    for (const item of auth) {
      tempModelData.auth[item.key] = ''
    }
    const options = modelOptions.get(modelName)
    for (const item of options) {
      tempModelData.options[item.key] = item.default
    }
    modelData.value = tempModelData
  }

  /**
   * @param {String} modelName
   * @returns {Boolean} 是否加载成功
   */
  function loadModelData(modelName) {
    const tempModelData = uni.getStorageSync(modelName)
    return tempModelData ? !!(modelData.value = tempModelData) : false
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
