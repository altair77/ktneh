<template>
  <div>
    <v-container>
      <v-icon>mdi-cursor-default-click</v-icon>
      <v-btn
        fab
        small
        color="red"
        class="mx-1"
        @click="pushWire('red')"
      >
        <v-icon>mdi-tilde</v-icon>
      </v-btn>
      <v-btn
        fab
        small
        color="blue"
        class="mx-1"
        @click="pushWire('blue')"
      >
        <v-icon>mdi-tilde</v-icon>
      </v-btn>
      <v-btn
        fab
        small
        color="grey darken-1"
        class="mx-1"
        @click="pushWire('black')"
      >
        <v-icon>mdi-tilde</v-icon>
      </v-btn>
      <v-btn
        outlined
        small
        class="mx-1"
        @click="popWire()"
      >
        <v-icon>mdi-undo</v-icon> undo
      </v-btn>
    </v-container>
    <v-container>
      <v-icon>mdi-playlist-edit</v-icon>
      <v-chip
        color="red"
        class="mx-1"
      >
        <v-icon class="mr-2">mdi-tilde</v-icon> {{redCount}}
      </v-chip>
      <v-chip
        color="blue"
        class="mx-1"
      >
        <v-icon class="mr-2">mdi-tilde</v-icon> {{blueCount}}
      </v-chip>
      <v-chip
        color="grey darken-1"
        class="mx-1"
      >
        <v-icon class="mr-2">mdi-tilde</v-icon> {{blackCount}}
      </v-chip>
    </v-container>
    <v-container
      v-if="answer"
    >
      <v-icon>mdi-check</v-icon>
      <v-chip
        :color="answer.color"
        class="mx-1"
      >
        <v-icon class="mr-2">mdi-tilde</v-icon>
        <span
          v-for="alpha in answer.alpha"
          :key="alpha"
          class="ma-1"
        >
          {{alpha}}
        </span>
      </v-chip>
    </v-container>
  </div>
</template>

<script>
const wires = {
  red: [
    ['C'],
    ['B'],
    ['A'],
    ['A', 'C'],
    ['B'],
    ['A', 'C'],
    ['A', 'B', 'C'],
    ['A', 'B'],
    ['B'],
  ],
  blue: [
    ['B'],
    ['A', 'C'],
    ['B'],
    ['A'],
    ['B'],
    ['B', 'C'],
    ['C'],
    ['A', 'C'],
    ['A'],
  ],
  black: [
    ['A', 'B', 'C'],
    ['A', 'C'],
    ['B'],
    ['A', 'C'],
    ['B'],
    ['B', 'C'],
    ['A', 'B'],
    ['C'],
    ['C'],
  ]
}

export default {
  template: '<ordered-wire-module>',
  data() {
    return {
      stack: [],
    }
  },
  computed: {
    redCount() {
      return this.stack.filter(s => s === 'red').length
    },
    blueCount() {
      return this.stack.filter(s => s === 'blue').length
    },
    blackCount() {
      return this.stack.filter(s => s === 'black').length
    },
    answer() {
      if (this.stack.length === 0) {
        return false
      }
      let last = this.stack.slice(-1)[0]
      let color = last
      let alpha = wires[last][this.stack.filter(s => s === last).length - 1]
      if (last === 'black') {
        color = 'grey darken-1'
      }
      return { color, alpha }
    },
  },
  methods: {
    pushWire(color) {
      if (this.stack.filter(s => s === color).length >= 9) {
        return
      }
      this.stack.push(color)
    },
    popWire() {
      if (this.stack.length === 0) {
        return
      }
      this.stack.pop()
    }
  },
}
</script>
