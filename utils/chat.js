import { ref } from 'vue'

export function useTypeWriter(baseInterval = 100) {
  const text = ref('')
  let _text = ''
  let index = 0
  let timer
  let lastCallTime
  const callTimes = []

  /**
   * @param {Number} newTextLength
   */
  function _setInterval(newTextLength) {
    const textInterval = (() => {
      if (!lastCallTime) {
        // 首次调用
        lastCallTime = performance.now()
        return baseInterval / newTextLength
      } else {
        clearInterval(timer)

        const currentTime = performance.now()
        const interval = currentTime - lastCallTime

        callTimes.push(interval)
        if (callTimes.length > 10) callTimes.shift()

        lastCallTime = currentTime

        const averageWaitTime = callTimes.reduce((prev, curr) => prev + curr, 0) / callTimes.length
        return (0.125 * averageWaitTime + 0.875 * interval) / (_text.length + newTextLength - index)
      }
    })()

    timer = setInterval(() => {
      if (index < _text.length) {
        text.value += _text[index++]
      } else {
        clearInterval(timer)
      }
    }, textInterval)
  }

  /**
   * @param {String} newText
   */
  function addText(newText) {
    _text += newText
    _setInterval(newText.length)
  }

  async function flush() {
    if (text.value !== _text) {
      clearInterval(timer)
      return new Promise((resolve) => {
        const _timer = setInterval(() => {
          if (index < _text.length) {
            text.value += _text[index++]
          } else {
            clearInterval(_timer)
            resolve()
          }
        })
      })
    }
  }

  return { text, addText, flush }
}
