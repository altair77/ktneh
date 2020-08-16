<template>
  <div>
    <v-container
      v-if="snVowels == 'unknown'"
    >
      <v-icon>mdi-cursor-default-click</v-icon>
      <span class="mx-1">SNの母音</span>
      <v-btn-toggle
        v-model="snVowels"
        mandatory
      >
        <v-btn value="unknown" small>不明</v-btn>
        <v-btn value="yes" small>あり</v-btn>
        <v-btn value="no" small>なし</v-btn>
      </v-btn-toggle>
    </v-container>
    <v-container>
      <v-icon>mdi-cursor-default-click</v-icon>
      <v-btn
        v-for="button in buttons"
        :key="button.name"
        :color="button.color"
        @click="push(button)"
        class="mx-1"
        small
      >
        <span :class="{font_black: button.isBlack}">{{ button.label }}</span>
      </v-btn>
    </v-container>
    <v-container
      v-if="stack.length > 0"
    >
      <v-icon>mdi-playlist-edit</v-icon>
      <v-chip
        v-for="chip in stack"
        :key="chip.index"
        :color="chip.color"
        class="mx-1"
      >
        <span :class="{font_black: chip.isBlack}">{{ chip.index + 1 }}</span>
      </v-chip>
    </v-container>
    <v-container
      v-if="snVowels != 'unknown'"
      class="d-flex align-center"
    >
      <v-icon>mdi-check</v-icon>
      <simon-image
        :vowel="snVowels == 'yes'"
        :miss="miss"
        class="mx-1"
      />
      <v-chip
        v-for="chip in answer"
        :key="chip.index"
        :color="chip.color"
        class="mx-1"
      >
        <span :class="{font_black: chip.isBlack}">{{ chip.index + 1 }}</span>
      </v-chip>
    </v-container>
  </div>
</template>

<script>
import SimonImage from '~/components/SimonImage'

export default {
  template: '<simon-module>',
  data() {
    return {
      buttons: {
        blue: { name: 'blue', label: '青', color: 'blue', isBlack: true },
        red: { name: 'red', label: '赤', color: 'red', isBlack: false },
        yellow: { name: 'yellow', label: '黄', color: 'yellow', isBlack: true },
        green: { name: 'green', label: '緑', color: 'green', isBlack: false },
      },
      stack: [],
    }
  },
  computed: {
    answer() {
      let ret = []
      for (let b of this.stack) {
        if (b.name == 'blue') {
          if (this.snVowels == 'no' && this.miss == 0) {
            ret.push(this.buttons.yellow)
          }
          else if (this.snVowels == 'no' && this.miss == 2) {
            ret.push(this.buttons.green)
          }
          else if (this.snVowels == 'yes' && this.miss == 0) {
            ret.push(this.buttons.red)
          }
          else if (this.snVowels == 'yes' && this.miss == 1) {
            ret.push(this.buttons.green)
          }
          else if (this.snVowels == 'yes' && this.miss == 2) {
            ret.push(this.buttons.red)
          }
          else {
            ret.push(this.buttons.blue)
          }
        }
        if (b.name == 'red') {
          if (this.snVowels == 'no' && this.miss == 0) {
            ret.push(this.buttons.blue)
          }
          else if (this.snVowels == 'no' && this.miss == 2) {
            ret.push(this.buttons.yellow)
          }
          else if (this.snVowels == 'yes' && this.miss == 0) {
            ret.push(this.buttons.blue)
          }
          else if (this.snVowels == 'yes' && this.miss == 1) {
            ret.push(this.buttons.yellow)
          }
          else if (this.snVowels == 'yes' && this.miss == 2) {
            ret.push(this.buttons.green)
          }
          else {
            ret.push(this.buttons.red)
          }
        }
        if (b.name == 'yellow') {
          if (this.snVowels == 'no' && this.miss == 0) {
            ret.push(this.buttons.red)
          }
          else if (this.snVowels == 'no' && this.miss == 1) {
            ret.push(this.buttons.green)
          }
          else if (this.snVowels == 'no' && this.miss == 2) {
            ret.push(this.buttons.red)
          }
          else if (this.snVowels == 'yes' && this.miss == 0) {
            ret.push(this.buttons.green)
          }
          else if (this.snVowels == 'yes' && this.miss == 1) {
            ret.push(this.buttons.red)
          }
          else if (this.snVowels == 'yes' && this.miss == 2) {
            ret.push(this.buttons.blue)
          }
          else {
            ret.push(this.buttons.yellow)
          }
        }
        if (b.name == 'green') {
          if (this.snVowels == 'no' && this.miss == 1) {
            ret.push(this.buttons.yellow)
          }
          else if (this.snVowels == 'no' && this.miss == 2) {
            ret.push(this.buttons.blue)
          }
          else if (this.snVowels == 'yes' && this.miss == 0) {
            ret.push(this.buttons.yellow)
          }
          else if (this.snVowels == 'yes' && this.miss == 1) {
            ret.push(this.buttons.blue)
          }
          else if (this.snVowels == 'yes' && this.miss == 2) {
            ret.push(this.buttons.yellow)
          }
          else {
            ret.push(this.buttons.green)
          }
        }
      }
      let i = 0
      ret = ret.map(b => ({...b, index: i++}))
      return ret
    },
    miss: {
      get() {
        return this.$store.state.additional.miss
      },
      set(value) {
        this.$store.commit('additional/setMiss', value)
      },
    },
    snVowels: {
      get() {
        return this.$store.state.additional.snVowels
      },
      set(value) {
        this.$store.commit('additional/setSnVowels', value)
      },
    },
  },
  methods: {
    push(button) {
      if (this.stack.length > 7) {
        return
      }
      let element = { ...button, index: this.stack.length }
      this.stack.push(element)
    },
  },
}
</script>

<style scoped>
.font_black {
  color: black;
}
</style>
