export const state = () => ({
  miss: 0,
  snNumber: "unknown",
  snVowels: "unknown",
  indCar: "unknown",
  indFrk: "unknown",
  battery: "unknown",
  parallel: "unknown",
})

export const mutations = {
  setMiss(state, value) {
    state.miss = value
  },
  setSnNumber(state, value) {
    state.snNumber = value
  },
  setSnVowels(state, value) {
    state.snVowels = value
  },
  setIndCar(state, value) {
    state.indCar = value
  },
  setIndFrk(state, value) {
    state.indFrk = value
  },
  setBattery(state, value) {
    state.battery = value
  },
  setParallel(state, value) {
    state.parallel = value
  },
}