<template>
  <v-container>
    <v-row>
      <module-frame
        v-for="module in modules"
        :key="module.id"
        :id="module.id"
        :type="module.type"
      />
    </v-row>
  </v-container>
</template>

<script>
import { eventBus } from '~/middleware/eventBus'

export default {
  data() {
    return {
      modules: new Array(0),
      uid: 0,
    }
  },
  template: '<module-work>',
  mounted() {
    eventBus.$on('addModule', this.addModule)
    eventBus.$on('deleteModule', this.deleteModule)
  },
  methods: {
    addModule(type) {
      this.modules.unshift({id: this.uid, type: type})
      this.uid++
    },
    deleteModule(id) {
      this.modules = this.modules.filter(module => module.id != id)
    },
  },
}
</script>
