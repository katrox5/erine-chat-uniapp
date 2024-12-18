import { ref, computed, watchEffect } from 'vue'
import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', () => {
  const contents = ref([])
  
  const messages = computed(() =>
    contents.value.reduce((result, content) => {
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
    }, []),
  )
  
  function addPrompt(prompt) {
    const index = contents.value.length - 1
    if (!contents.value[index]?.answer) {
      contents.value.pop()
    }
    contents.value.push({ prompt })
  }
  
  function setAnswer(answer, index) {
    contents.value[index].answer = answer
  }
  
  function clearContents() {
    contens.value = []
  }
  
  function loadContents() {
    const messages = []
    // TODO: read
    for (let i = 0; i < messages.length; i += 2) {
      const prompt = messages[i]
      const answer = messages[i + 1]
      if (
        prompt['role'] != 'user' ||
        !prompt['content'] ||
        answer?.['role'] != 'assistant' ||
        !answer['content']
      ) {
        continue
      }
      contents.value.push({
        prompt: prompt['content'],
        answer: answer['content'],
      })
    }
  }
  
  watchEffect(() => {
    // TODO: write
  })
  
  return {
    contents,
    messages,
    addPrompt,
    setAnswer,
    clearContents,
  }
})
