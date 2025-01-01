export function useWaveNumber() {
  let count = 0
  return function () {
    return ++count % 2
  }
}
