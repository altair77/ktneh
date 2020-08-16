<template>
  <div>
    <v-container
      class="d-flex"
    >
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
      v-show="wantSerial"
    >
      <v-icon>mdi-cursor-default-click</v-icon>
      <span class="mx-2">SNの最後の数字</span>
      <v-btn-toggle
        v-model="snNumber"
        mandatory
      >
        <v-btn value="unknown" small>不明</v-btn>
        <v-btn value="odd" small>奇数</v-btn>
        <v-btn value="even" small>偶数</v-btn>
      </v-btn-toggle>
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
      v-show="answer"
    >
      <v-icon>mdi-check</v-icon>
      <v-chip
        :color="answer.color"
        class="mx-1"
      >
        <span :class="{font_black: answer.isBlack}">{{ answer.index + 1 }}</span>
      </v-chip>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        {name: "red", label: "赤", color: "red", isBlack: false},
        {name: "black", label: "黒", color: "grey darken-3", isBlack: false},
        {name: "yellow", label: "黄", color: "yellow", isBlack: true},
        {name: "blue", label: "青", color: "blue", isBlack: true},
        {name: "white", label: "白", color: "white", isBlack: true},
        {name: "other", label: "他", color: "green", isBlack: false},
      ],
      stack: [],
      wantSerial: false,
    }
  },
  template: '<wire-module>',
  methods: {
    push(wire) {
      if (this.stack.length > 5) {
        return
      }
      let element = {...wire, index: this.stack.length}
      this.stack.push(element)
    },
  },
  computed: {
    answer() {
      this.wantSerial = false
      let reds = this.stack.filter((element) => {
        return element.name == 'red'
      })
      let blues = this.stack.filter((element) => {
        return element.name == 'blue'
      })
      let yellows = this.stack.filter((element) => {
        return element.name == 'yellow'
      })
      let blacks = this.stack.filter((element) => {
        return element.name == 'black'
      })
      let whites = this.stack.filter((element) => {
        return element.name == 'white'
      })
      switch (this.stack.length) {
        case 3:
          // 赤いワイヤがなければ、2本目のワイヤを切る
          if (reds.length == 0) {
            return this.stack[1]
          }
          // 最後のワイヤが白ければ、最後のワイヤを切る
          if (this.stack[2].name == 'white') {
            return this.stack[2]
          }
          // 青いワイヤが1本よりも多ければ、最後の青いワイヤを切る
          if (blues.length > 1) {
            return blues[blues.length - 1]
          }
          return this.stack[this.stack.length - 1]
        case 4:
          // 赤いワイヤが1本より多く、シリアルナンバーの最後の数字が奇数の場合、最後の赤いワイヤを切る
          if (reds.length > 1) {
            if (this.snNumber == 'unknown') {
              this.wantSerial = true
              return false
            } 
            if (this.snNumber == 'odd') {
              return reds[reds.length - 1]
            }
          }
          // 最後のワイヤが黄色くてかつ赤いワイヤがなければ、最初のワイヤを切る
          if (this.stack.slice(-1)[0] == 'yellow' && reds.length == 0) {
            return this.stack.slice(-1)[0]
          }
          // 青いワイヤが1本しかなければ、最初のワイヤを切る
          if (blues.length == 1) {
            return this.stack[0]
          }
          // 黄色いワイヤが1本より多ければ、最後のワイヤを切る
          if (yellows.length > 1) {
            return this.stack.slice(-1)[0]
          }
          return this.stack[1]
        case 5:
          // 最後のワイヤが黒でかつシリアルナンバーの最後の数字が奇数の場合、4本目のワイヤを切る
          if (this.stack.slice(-1)[0] == 'black') {
            if (this.snNumber == 'unknown') {
              this.wantSerial = true
              return false
            }
            if (this.snNumber == 'odd') {
              return this.stack[3]
            }
          }
          // 赤いワイヤが1本しかなくかつ黄色いワイヤが1本よりも多ければ最初のワイヤを切る
          if (reds.length == 1 && yellows.length > 1) {
            return this.stack[0]
          }
          // 黒いワイヤがなければ、2本目のワイヤを切る
          if (blacks.length == 0) {
            return this.stack[1]
          }
          // 最初のワイヤを切る
          return this.stack[0]
        case 6:
          // 黄色いワイヤがなくシリアルナンバーの最後の数字が奇数の場合、3本目のワイヤを切る
          if (yellows.length == 0) {
            if (this.snNumber == 'unknown') {
              this.wantSerial = true
              return false
            }
            if (this.snNumber == 'odd') {
              return this.stack[2]
            }
          }
          // 黄色いワイヤが1本しかなく白いワイヤが1本よりも多ければ、4本目を切る
          if (yellows.length == 1 && whites.length > 1) {
            return this.stack[3]
          }
          // 赤いワイヤがなければ、最後のワイヤを切る
          if (reds.length == 0) {
            return this.stack.slice(-1)[0]
          }
          // 4本目のワイヤを切る
          return this.stack[3]
        default:
          return false
      }
    },
    snNumber: {
      get() {
        return this.$store.state.additional.snNumber
      },
      set(value) {
        this.$store.commit('additional/setSnNumber', value)
      },
    },
  },
}
</script>

<style scoped>
  .font_black {
    color: black;
  }
</style>