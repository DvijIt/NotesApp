<template v-if=message>
  <div class="message">
    <p>{{ getMessage }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getMessage"]),
  }
};
</script>

<style lang="scss" scoped>
.message {
  text-align: center;
  padding: 20px;
}
p {
  color: #ba3838;
}
</style>
