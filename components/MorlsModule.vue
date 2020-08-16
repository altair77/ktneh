<template>
  <div>
    <v-container>
      <v-icon>mdi-cursor-default-click</v-icon>
      <v-btn
        outlined
        small
        @click="pushStack(0)"
        class="mx-1"
      >
        <v-icon>mdi-circle-small</v-icon>
      </v-btn>
      <v-btn
        outlined
        small
        @click="pushStack(1)"
        class="mx-1"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn
        v-if="stack.length > 0"
        @click="stackDelete"
        color="red"
        small
        class="mx-1"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn
        v-if="stackChar"
        @click="pushList"
        color="green"
        small
        class="mx-1"
      >
        <v-icon>mdi-playlist-plus</v-icon>
      </v-btn>
    </v-container>
    <v-container>
      <v-icon>mdi-playlist-edit</v-icon>
      <v-chip
        v-for="(signal, index) in stack"
        :key="index"
        class="mx-1"
      >
        <v-icon small>{{signal ? 'mdi-minus' : 'mdi-circle-small'}}</v-icon>
      </v-chip>
      <div
       v-if="stackChar"
       class="stack-char"
      >
        <v-icon class="mx-1">mdi-swap-horizontal</v-icon>
        <v-chip color="blue darken-2" class="mx-1">{{stackChar.name}}</v-chip>
      </div>
    </v-container>
    <v-container>
      <v-icon>mdi-format-list-bulleted</v-icon>
      <v-chip
        v-for="(char, index) in list"
        :key="index"
        @click:close="deleteListItem(index)"
        close
        color="blue darken-2"
        class="mx-1"
      >
        {{char.name}}
      </v-chip>
    </v-container>
    <v-container>
      <table><tr><td>
        <v-icon>mdi-check</v-icon>
      </td><td>
        <v-chip
          v-for="answer in answers"
          :key="answer.name"
          class="ma-1"
        >
          {{answer.name}} {{answer.frequency}}
        </v-chip>
      </td></tr></table>
    </v-container>
  </div>
</template>

<script>
const words = {
  shell:  {name: 'shell',  frequency: 3.505},
  halls:  {name: 'halls',  frequency: 3.515},
  slick:  {name: 'slick',  frequency: 3.522},
  trick:  {name: 'trick',  frequency: 3.532},
  boxes:  {name: 'boxes',  frequency: 3.535},
  leaks:  {name: 'leaks',  frequency: 3.542},
  strobe: {name: 'strobe', frequency: 3.545},
  bistro: {name: 'bistro', frequency: 3.552},
  flick:  {name: 'flick',  frequency: 3.555},
  bombs:  {name: 'bombs',  frequency: 3.565},
  break:  {name: 'break',  frequency: 3.572},
  brick:  {name: 'brick',  frequency: 3.575},
  steak:  {name: 'steak',  frequency: 3.582},
  string: {name: 'string', frequency: 3.592},
  vector: {name: 'vector', frequency: 3.595},
  beats:  {name: 'beats',  frequency: 3.600},
}

const alpha = {
  a: {name: 'a', morls: [0,1]},
  b: {name: 'b', morls: [1,0,0,0]},
  c: {name: 'c', morls: [1,0,1,0]},
  e: {name: 'e', morls: [0]},
  f: {name: 'f', morls: [0,0,1,0]},
  g: {name: 'g', morls: [1,1,0]},
  h: {name: 'h', morls: [0,0,0,0]},
  i: {name: 'i', morls: [0,0]},
  k: {name: 'k', morls: [0,1,1,1]},
  l: {name: 'l', morls: [0,1,0,0]},
  m: {name: 'm', morls: [1,1]},
  n: {name: 'n', morls: [1,0]},
  o: {name: 'o', morls: [1,1,1]},
  r: {name: 'r', morls: [0,1,0]},
  s: {name: 's', morls: [0,0,0]},
  t: {name: 't', morls: [1]},
  v: {name: 'v', morls: [0,0,0,1]},
  w: {name: 'w', morls: [0,1,1]},
  x: {name: 'x', morls: [1,0,0,1]},
}

const morlsToChar = morls => {
  let hit = Object.values(alpha)
      .find(a => a.morls.length === morls.length && a.morls.every((m, i) => m === morls[i]))
  if (hit) {
    return hit
  }
  return false
}

export default {
  template: '<morls-module>',
  data() {
    return {
      stack: [],
      list: [],
    }
  },
  computed: {
    stackChar() {
      return morlsToChar(this.stack)
    },
    answers() {
      if (this.list.length === 0) {
        return []
      }
      return Object.values(words)
          .filter(w => this.list.every(char => w.name.includes(char.name)))
    },
  },
  methods: {
    pushStack(signal) {
      if (this.stack.length > 4) {
        return
      }
      this.stack.push(signal)
    },
    stackDelete() {
      this.stack = []
    },
    pushList() {
      if (this.list.length > 6) {
        return
      }
      this.list.push(this.stackChar)
      this.stackDelete()
    },
    deleteListItem(index) {
      this.list.splice(index, 1)
    },
  },
}
</script>

<style scoped>
  .stack-char {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
  }
</style>
