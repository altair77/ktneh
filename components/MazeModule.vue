<template>
  <div>
    <v-container class="d-flex">
      <v-icon class="mr-2">mdi-cursor-default-click</v-icon>
      <maze-image
        :circle="circle"
        :start="start"
        :goal="goal"
        :hover="hover"
        @click="clickedCell"
        @answer="answered"
        @error="recieveError"
      />
    </v-container>
    <v-container
      v-if="route"
    >
      <table><tr><td>
        <v-icon class="mr-2">mdi-check</v-icon>
      </td><td>
        <v-chip
          v-for="(arrow, index) in route"
          :key="index"
          color="blue darken-2"
          class="mr-1 mb-1 arrow"
        >
          <v-icon>mdi-arrow-{{arrow}}-bold</v-icon>
        </v-chip>
      </td></tr></table>
    </v-container>
  </div>
</template>

<script>
import MazeImage from '~/components/MazeImage'

export default {
  components: {
    MazeImage,
  },
  template: '<maze-module>',
  data() {
    return {
      circle: false,
      start:  false,
      goal:   false,
      hover:  'circle',
      route:  false,
    }
  },
  methods: {
    clickedCell(cell) {
      if (!this.circle) {
        this.circle = {...cell}
        this.hover = 'start'
        return
      }
      if (!this.start) {
        this.start = {...cell}
        this.hover = 'goal'
        return
      }
      if (!this.goal) {
        this.goal = {...cell}
        this.hover = false
        return
      }
    },
    answered(route) {
      this.route = route
    },
    recieveError(error) {
      if (error.type == 'circle') {
        this.circle = false
        this.hover = 'circle'
      }
    },
  },
}
</script>

<style scoped>
  .arrow {
    padding-left: 4px;
    padding-right: 4px;
  }
</style>
