export default {
  state: {
    title: "Notes App",

    message: null,
    grid: true
  },
  mutations: {
    getMessage(state, message) {
      state.message = message;
    },
    getGridProp(state, prop) {
      state.grid = prop
    }
  },
  getters: {
    getMessage: state => state.message,
    getGrid: state => state.grid,
    getTitle: state => state.title
  }
}