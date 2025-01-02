import { customRef } from 'vue'

export function useAutoResetRef(initialValue, delay = 1000) {
  let value = initialValue
  let timeoutId

  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        if (timeoutId) {
          clearTimeout(timeoutId)
        }

        value = newValue
        trigger()

        timeoutId = setTimeout(() => {
          value = initialValue
          trigger()
        }, delay)
      },
    }
  })
}
