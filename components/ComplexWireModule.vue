<template>
  <div>
    <v-container>
      <table>
        <tr><td rowspan="6">
          <v-icon class="mr-1">mdi-cursor-default-click</v-icon>
        </td></tr>
        <tr>
          <td v-for="(wire, index) in wires" :key="index">{{index + 1}}</td>
        </tr>
        <tr>
          <td v-for="(wire, index) in wires" :key="index">
            <v-btn
              @click="wire.light = !wire.light"
              fab
              small
              :color="wire.light ? 'orange' : ''"
            >
              <v-icon>mdi-lightbulb-{{wire.light ? 'on' : 'off'}}</v-icon>
            </v-btn>
          </td>
        </tr>
        <tr>
          <td v-for="(wire, index) in wires" :key="index">
            <v-btn
              @click="wire.red = !wire.red"
              fab
              small
              :color="wire.red ? 'red' : ''"
            >
              <v-icon>mdi-tilde</v-icon>
            </v-btn>
          </td>
        </tr>
        <tr>
          <td v-for="(wire, index) in wires" :key="index">
            <v-btn
              @click="wire.blue = !wire.blue"
              fab
              small
              :color="wire.blue ? 'blue' : ''"
            >
              <v-icon>mdi-tilde</v-icon>
            </v-btn>
          </td>
        </tr>
        <tr>
          <td v-for="(wire, index) in wires" :key="index">
            <v-btn
              @click="wire.star = !wire.star"
              fab
              small
              :color="wire.star ? 'orange' : ''"
            >
              <v-icon>mdi-star{{wire.star ? '' : '-off'}}</v-icon>
            </v-btn>
          </td>
        </tr>
        <tr>
          <td><v-icon class="mr-1 my-2">mdi-check</v-icon></td>
          <td v-for="(answer, index) in answers" :key="index">
            <v-icon v-if="answer === 'C'">mdi-box-cutter</v-icon>
            <v-icon v-else-if="answer === 'D'">mdi-box-cutter-off</v-icon>
            <v-icon v-else>mdi-help</v-icon>
          </td>
        </tr>
      </table>
    </v-container>
    <v-container
      v-if="wantSerial"
      class="d-flex"
    >
      <v-icon>mdi-cursor-default-click</v-icon>
      <span class="mx-1">SNの最後の数字</span>
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
      v-if="wantBattery"
      class="d-flex"
    >
      <v-icon>mdi-cursor-default-click</v-icon>
      <span class="mx-1">バッテリ</span>
      <v-btn-toggle
        v-model="battery"
        mandatory
      >
        <v-btn value="unknown" small>不明</v-btn>
        <v-btn value="0" small>0</v-btn>
        <v-btn value="1" small>1</v-btn>
        <v-btn value="2" small>2</v-btn>
        <v-btn value="3" small>3以上</v-btn>
      </v-btn-toggle>
    </v-container>
    <v-container
      v-if="wantParallel"
      class="d-flex"
    >
      <v-icon>mdi-cursor-default-click</v-icon>
      <span class="mx-1">パラレルポート</span>
      <v-btn-toggle
        v-model="parallel"
        mandatory
      >
        <v-btn value="unknown" small>不明</v-btn>
        <v-btn value="yes" small>あり</v-btn>
        <v-btn value="no" small>なし</v-btn>
      </v-btn-toggle>
    </v-container>
  </div>
</template>

<script>
export default {
  template: '<complex-wire-module>',
  data() {
    return {
      wires: [
        {light: false, red: false, blue: false, star: false},
        {light: false, red: false, blue: false, star: false},
        {light: false, red: false, blue: false, star: false},
        {light: false, red: false, blue: false, star: false},
        {light: false, red: false, blue: false, star: false},
        {light: false, red: false, blue: false, star: false},
      ],
      wantSerial: false,
      wantParallel: false,
      wantBattery: false,
    }
  },
  computed: {
    answers() {
      this.wantSerial = false
      this.wantParallel = false
      this.wantBattery = false
      let ans = this.wires.map(w => {
        if ((!w.light && !w.red && !w.blue && !w.star)
            || (!w.light && !w.blue && w.star)) {
          return 'C'
        }
        if ((!w.light && !w.red && w.blue && w.star)
            || (w.light && w.red && w.blue && w.star)
            || (w.light && !w.red && !w.blue && !w.star)) {
          return 'D'
        }
        if ((w.light && !w.red && w.blue)
            || (!w.light && w.red && w.blue && w.star)) {
          return 'P'
        }
        if ((!w.light && !w.star && (w.red || w.blue))
            || (w.light && w.red && w.blue && !w.star)) {
          return 'S'
        }
        if (w.light && !w.blue && (w.red || w.star)) {
          return 'B'
        }
        return ''
      })
      if (ans.some(a => a === 'S')) {
        if (this.snNumber === 'unknown') {
          this.wantSerial = true
        }
        else if (this.snNumber === 'even') {
          ans = ans.map(a => a === 'S' ? 'C' : a)
        }
        else {
          ans = ans.map(a => a === 'S' ? 'D' : a)
        }
      }
      if (ans.some(a => a === 'P')) {
        if (this.parallel === 'unknown') {
          this.wantParallel = true
        }
        else if (this.parallel === 'yes') {
          ans = ans.map(a => a === 'P' ? 'C' : a)
        }
        else {
          ans = ans.map(a => a === 'P' ? 'D' : a)
        }
      }
      if (ans.some(a => a === 'B')) {
        if (this.battery === 'unknown') {
          this.wantBattery = true
        }
        else if (this.battery >= 2) {
          ans = ans.map(a => a === 'B' ? 'C' : a)
        }
        else {
          ans = ans.map(a => a === 'B' ? 'D' : a)
        }
      }
      return ans
    },
    snNumber: {
      get() {
        return this.$store.state.additional.snNumber
      },
      set(value) {
        this.$store.commit('additional/setSnNumber', value)
      },
    },
    parallel: {
      get() {
        return this.$store.state.additional.parallel
      },
      set(value) {
        this.$store.commit('additional/setParallel', value)
      },
    },
    battery: {
      get() {
        return this.$store.state.additional.battery
      },
      set(value) {
        this.$store.commit('additional/setBattery', value)
      },
    },
  },
}
</script>

<style scoped>
  td {
    text-align: center;
  }
  .color-buttons {
    flex-direction: column;
  }
</style>