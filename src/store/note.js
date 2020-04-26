export default {
  state: {
    note: {
      title: "",
      descr: "",
      priority: "normal",
      editing: {
        title: "",
        editTitle: false,
        descr: "",
        editDescr: false
      }
    },
    priority: ["normal", "warning", "important"]
  },
  getters: {
    note: state => state.note,
    priority: state => state.priority
  }
}