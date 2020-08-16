<template>
  <div>
    <v-list-item-title>{{ attention.label }}</v-list-item-title>
    <v-btn-toggle
      v-model="state"
      mandatory
    >
      <v-btn
        v-for="button in attention.buttons"
        :key="button.label"
        :value="button.value"
        small
      >
        {{ button.label }}
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  props: [
    'attention',
  ],
  template: '<additional-navi-button>',
  computed: {
    state: {
      get() {
        return this.$store.state.additional[this.attention.name]
      },
      set(value) {
        let methodName = 'set' + this.attention.name.charAt(0).toUpperCase() + this.attention.name.slice(1)
        this.$store.commit('additional/' + methodName, value)
      },
    },
  },
}
</script>