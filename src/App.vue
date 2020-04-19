<template>
  <div class="wrapper">
    <!-- <header></header> -->

    <div class="wrapper-content" @click="stop">
      <section>
        <div class="container">
          <!-- message -->
          <message v-if="message" :message="message" />
          <!-- new note -->
          <newNote :note="note" @addNote="addNote" :priority="priority" />
          <!-- title -->
          <div class="note-header">
            <h1>{{ title }}</h1>
            <!-- search -->
            <search @search="search = $event" :value="search" placeholder="Find your note" />
            <!-- icon-controls -->
            <div class="icons">
              <svg :class="{ active: grid }" @click="grid = true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
              <svg :class="{ active: !grid }" @click="grid = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3" y2="6" /><line x1="3" y1="12" x2="3" y2="12" /><line x1="3" y1="18" x2="3" y2="18" /></svg>
            </div>
          </div>
          <!-- note list -->
          <notes :notes="notesFilter" @remove="removeNote" @editing="editing" :grid="grid" />
        </div>
      </section>
    </div>

    <!-- <footer></footer> -->
  </div>
</template>

<script>
import message from "@/components/Message.vue";
import notes from "@/components/Notes.vue";
import newNote from "@/components/NewNote.vue";
import search from "@/components/Search.vue";

export default {
  components: {
    message,
    notes,
    newNote,
    search
  },
  data() {
    return {
      title: "Notes App",
      message: null,
      grid: true,
      search: "",
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
      priority: ["normal", "warning", "important"],
      notes: [
        {
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
      ]
    };
  },
  methods: {
    addNote() {
      let { title, descr, priority } = this.note;
      if (title === "") {
        this.message = "Title can`t be blank!";
        return false;
      }

      this.notes.push({
        title,
        descr,
        date: new Date(Date.now()).toLocaleString(),
        priority,
        editing: {
          editTitle: false,
          editDescr: false
        }
      });
      this.message = null;
      this.note.title = "";
      this.note.descr = "";
      this.note.priority = "normal";
    },

    removeNote(index) {
      this.notes.splice(index, 1);
    },

    editing(data) {
      console.log(data);
      if (data.title !== "") {
        this.notes[data.index].title = data.title;
      }
      if (data.descr !== "") {
        this.notes[data.index].descr = data.descr;
      }
      this.notes[data.index].date = new Date(Date.now()).toLocaleString();
      this.notes[data.index].editing.editTitle = false;
      this.notes[data.index].editing.editDescr = false;
    },
    stop() {
      if (event.target.closest(".note") === null) {
        this.notes.forEach(el => {
          el.editing.editTitle = false;
          el.editing.editDescr = false;
        });
      }
    }
  },
  computed: {
    notesFilter() {
      let array = this.notes,
        search = this.search;
      if (!search) return array;
      // Small
      search = search.trim().toLowerCase();
      // Filter
      array = array.filter(item => {
        if (item.title.toLowerCase().indexOf(search) !== -1) {
          return item;
        }
      });
      return array;
    }
  }
};
</script>

<style>
</style>
