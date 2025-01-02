export function useWaveNumber() {
  let count = 0
  return function () {
    return ++count % 2
  }
}

export function hashCode(obj) {
  const str = obj.toString()
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0
  }
  return hash
}
