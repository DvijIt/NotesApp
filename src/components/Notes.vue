<template>
  <div class="notes">
    <div
      class="note"
      :class="[{ full: !grid, }, note.priority]"
      v-for="(note, index) in notes"
      :key="index"
    >
      <div class="note-header" :class="{ full: !grid }">
        <input
          type="text"
          class="hiddenInput"
          @keyup.enter="edit(index)"
          @keyup.esc="stop(index)"
          v-show="note.editing.editTitle"
          v-model="note.editing.title"
        />
        <p
          class="textTitle"
          v-show="!note.editing.editTitle"
          @click="showInput(index)"
        >{{ note.title }}</p>
        <p class="btnRemove" @click="remove(index)">x</p>
      </div>
      <div class="note-body">
        <input
          type="text"
          class="hiddenInput"
          @keyup.enter="edit(index)"
          @keyup.esc="note.editing.editDescr = false"
          v-show="note.editing.editDescr"
          v-model="note.editing.descr"
        />
        <p
          class="textDescr"
          v-show="!note.editing.editDescr"
          @click="showInput(index)"
        >{{ note.descr }}</p>
        <span>{{ note.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      required: true
    },
    grid: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    remove(index) {
      this.$emit("remove", index);
    },
    showInput(index) {
      
      if (event.target.classList.contains("textTitle")) {
        this.notes[index].editing.title = this.notes[index].title;
        this.notes[index].editing.editTitle = true;
      } else {
        this.notes[index].editing.descr = this.notes[index].descr;
        this.notes[index].editing.editDescr = true;
      }
      event.target.previousElementSibling.focus()
    },
    edit(index) {
      this.$emit("editing", {
        index,
        title: this.notes[index].editing.title,
        descr: this.notes[index].editing.descr
      });
    },
    stop(index) {
      this.notes[index].editing.editTitle = false;
    }
  }
};
</script>

<style lang="scss">
.hiddenInput {
  border: none;
  margin: 5px 15px 5px 0;
}
.notes {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 0;
}
.note {
  width: 48%;
  padding: 16px 20px;
  margin-bottom: 20px;
  background-color: #fff;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.02);
  &:hover {
    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.04);
    transform: translate(0, -6px);
    transition-delay: 0s !important;
  }
  &.full {
    width: 100%;
    text-align: center;
  }
  &.warning {
    background-color: #fed330;
  }
  &.important {
    background-color: #fc5c65;
  }
}
.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 32px;
  }
  p {
    font-size: 22px;
    color: #402caf;
  }
  .btnRemove {
    cursor: pointer;
  }
  svg {
    margin-right: 12px;
    cursor: pointer;
    color: #999;
    &.active {
      color: #402caf;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &.full {
    justify-content: center;
    .btnRemove {
      margin-left: 25px;
    }
  }
}
.note-body {
  p {
    margin: 20px 0;
  }
  span {
    font-size: 14px;
    color: 999;
  }
}
</style>