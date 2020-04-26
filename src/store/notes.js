export default {
  state: {
    notes: [{
        title: "First Note",
        descr: "Description for first note",
        date: new Date(Date.now()).toLocaleString(),
        priority: "normal",
        editing: {
          title: "",
          editTitle: false,
          descr: "",
          editDescr: false
        }
      },
      {
        title: "Second Note",
        descr: "Description for second note",
        date: new Date(Date.now()).toLocaleString(),
        priority: "warning",
        editing: {
          title: "",
          editTitle: false,
          descr: "",
          editDescr: false
        }
      },
      {
        title: "Third Note",
        descr: "Description for third note",
        date: new Date(Date.now()).toLocaleString(),
        priority: "important",
        editing: {
          title: "",
          editTitle: false,
          descr: "",
          editDescr: false
        }
      }
    ],
    search: '',
  },
  actions: {
    addNote({commit}, newNote) {
      commit('addNote', newNote)
    }
  },
  mutations: {
    removeNote(state, index) {
      state.notes.splice(index, 1);
    },
    addNote(state, newNote) {
      state.notes.push(newNote);
    },
    showEditField(state, index) {
      if (event.target.classList.contains("textTitle")) {
        state.notes[index].editing.title = state.notes[index].title;
        state.notes[index].editing.editTitle = true;
      } else {
        state.notes[index].editing.descr = state.notes[index].descr;
        state.notes[index].editing.editDescr = true;
      }
    },
    editNote(state, dataNote) {
      console.log(dataNote);
      let {index, title, descr } = dataNote
      if (title !== "") {
        state.notes[index].title = title;
      }
      if (descr !== "") {
        state.notes[index].descr = descr;
      }
      state.notes[index].date = new Date(Date.now()).toLocaleString();
      state.notes[index].editing.editTitle = false;
      state.notes[index].editing.editDescr = false;
    },
    stop(state) {
      if (event.target.closest(".note") === null) {
        state.notes.forEach(el => {
          el.editing.editTitle = false;
          el.editing.editDescr = false;
        });
      }
    },
    setSearch(state, value) {
      state.search = value
    },
  },
  getters: {
    getNotesFilter(state) {
      let array = state.notes,
        search = state.search;
      if (!search) return array;
      // Small
      search = search.trim().toLowerCase();
      // Filter
      array = array.filter(item => item.title.toLowerCase().indexOf(search) !== -1);
      return array;
    },
    getSearch: state => state.search,
  }
}