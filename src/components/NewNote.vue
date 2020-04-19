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
    <button class="btn btnPrimary" @click="addNote">New note</button>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    },
    priority: {
      type: Array,
      required: true
    }
  },
  methods: {
    addNote() {
      this.$emit("addNote", this.note);
    }
  },
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