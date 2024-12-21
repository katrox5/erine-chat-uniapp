import { ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useModelStore } from './model'
import { modelAdapter } from '@/adapters'

export const useContentStore = defineStore('content', () => {
  const modelStore = useModelStore()
  const { currentModel, modelData } = storeToRefs(modelStore)

  const contents = ref([])

  watch(modelData, loadContents, { once: true })

  watch(
    contents,
    () => {
      modelData.value.messages = contents.value.reduce((result, content) => {
        result.push({
          role: 'user',
          content: content.prompt,
        })
        if (content.answer) {
          result.push({
            role: 'assistant',
            content: content.answer,
          })
        }
        return result
      }, [])
    },
    { deep: true },
  )

  /**
   * @param {String} prompt
   */
  function addPrompt(prompt) {
    const index = contents.value.length - 1
    if (!contents.value[index]?.answer) {
      contents.value.pop()
    }
    contents.value.push({ prompt })
  }

  /**
   * @param {String} answer
   * @param {Number} index
   */
  function setAnswer(answer, index) {
    contents.value[index].answer = answer
  }

  function clearContents() {
    contents.value = []
  }

  function loadContents() {
    const adpater = modelAdapter.get(currentModel.value)
    const items = adpater.readMessages(modelData.value.messages)
    for (const item of items) {
      contents.value.push(item)
    }
  }

  return {
    contents,
    addPrompt,
    setAnswer,
    clearContents,
  }
})
