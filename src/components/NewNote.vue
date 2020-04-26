<template>
  <div class="new-note">
    <label>Title</label>
    <input type="text" v-model="note.title" />
    <label>Decription</label>
    <textarea v-model="note.descr"></textarea>
    <div class="note-priority">
      <div class="control" v-for="(item, index) in priority" :key="index">
        <label for="priority">{{item}}</label>
        <input type="radio" name="priority" :value="item" v-model="note.priority" />
      </div>
    </div>
    <button class="btn btnPrimary" @click="add">New note</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["addNote", "getMessage"]),
    add() {
      let { title, descr, priority, editing } = this.note;
      if (title === "") {
        this.getMessage("Title can`t be blank!");
        return false;
      }
      this.addNote({
        title,
        descr,
        date: new Date(Date.now()).toLocaleString(),
        priority,
        editing
      });

      this.note.title = "";
      this.note.descr = "";
      this.note.priority = "normal";
      this.getMessage(null);
    }
  },
  computed: {
    ...mapGetters(['note', 'priority'])
  }
};
</script>

<style lang="scss">
.new-note {
  text-align: center;
  button {
    margin: 20px 0;
  }
}
.note-priority {
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
  .control {
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      width: auto;
    }
  }
}
</style>