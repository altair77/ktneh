<template>
  <div>
    <v-container class="d-flex">
      <v-icon>mdi-cursor-default-click</v-icon>
      <v-btn-toggle
        v-model="button"
        mandatory
      >
        <v-btn
          v-for="btn in buttons"
          :key="btn.name"
          :value="btn"
          :color="btn.color"
          active-class="active-button"
          small
        >
          <span :class="{font_black: btn.isBlack}">{{ btn.label }}</span>
       </v-btn>
      </v-btn-toggle>
    </v-container>
    <v-container class="d-flex">
      <v-icon>mdi-cursor-default-click</v-icon>
      <v-btn-toggle
        v-model="text"
        mandatory
      >
        <v-btn
          v-for="txt in texts"
          :key="txt.name"
          :value="txt"
          small
        >
          {{ txt.label }}
       </v-btn>
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
      v-if="wantIndCar"
      class="d-flex"
    >
      <v-icon>mdi-cursor-default-click</v-icon>
      <span class="mx-1">INDのCAR</span>
      <v-btn-toggle
        v-model="indCar"
        mandatory
      >
        <v-btn value="unknown" small>不明</v-btn>
        <v-btn value="yes" small>あり</v-btn>
        <v-btn value="no" small>なし</v-btn>
      </v-btn-toggle>
    </v-container>
    <v-container
      v-if="wantIndFrk"
      class="d-flex"
    >
      <v-icon>mdi-cursor-default-click</v-icon>
      <span class="mx-1">INDのFRK</span>
      <v-btn-toggle
        v-model="indFrk"
        mandatory
      >
        <v-btn value="unknown" small>不明</v-btn>
        <v-btn value="yes" small>あり</v-btn>
        <v-btn value="no" small>なし</v-btn>
      </v-btn-toggle>
    </v-container>
    <v-container
      v-if="answer"
      class="d-flex"
    >
      <v-icon>mdi-check</v-icon>
      <span class="mx-1">{{ answer }}</span>
      <div v-if="answer == '長押し'">
        <v-chip
          class="mx-1"
          color="blue"
          small
        >
          青<v-avatar right class="blue darken-4">4</v-avatar>
        </v-chip>
        <v-chip
          class="mx-1"
          color="yellow"
          text-color="black"
          small
        >
          黄<v-avatar right class="yellow darken-4">5</v-avatar>
        </v-chip>
        <v-chip
          class="mx-1"
          color="green"
          small
        >
          他<v-avatar right class="green darken-4">1</v-avatar>
        </v-chip>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  template: '<button-module>',
  data() {
    return {
      buttons: [
        {name: 'blue', label: '青', color: 'blue', isBlack: true},
        {name: 'white', label: '白', color: 'white', isBlack: true},
        {name: 'yellow', label: '黄', color: 'yellow', isBlack: true},
        {name: 'red', label: '赤', color: 'red', isBlack: false},
        {name: 'other', label: '他', color: 'green', isBlack: false},
      ],
      texts: [
        {name: 'cancel', label: '中止'},
        {name: 'bomb', label: '起爆'},
        {name: 'long', label: '長押し'},
        {name: 'other', label: 'その他'},
      ],
      button: '',
      text: '',
      wantIndCar: false,
      wantIndFrk: false,
      wantBattery: false,
    }
  },
  computed: {
    answer() {
      this.wantIndCar = false
      this.wantIndFrk = false
      this.wantBattery = false
      let isLongPush = false
      // ボタンが青くかつボタンに「中止」と書かれている場合、ボタンを押したままで「ボタンを離すタイミング」を参照する
      if (this.button.name == 'blue' && this.text.name == 'cancel') {
        isLongPush = true
      }
      // 爆弾にバッテリーが1本よりも多くついていてかつボタンに「起爆」と書いてある場合、ボタンを押してすぐに離す
      if (!isLongPush && this.text.name == 'bomb') {
        if (this.battery == 'unknown') {
          this.wantBattery = true
          return false
        }
        if (this.battery == '2' || this.battery == '3') {
          return '押してすぐに離す'
        }
      }
      // ボタンが白くてかつ「CAR」というインジケーターがある場合、ボタンを押したままで「ボタンを離すタイミング」を参照する
      if (!isLongPush && this.button.name == 'white') {
        if (this.indCar == 'unknown') {
          this.wantIndCar = true
          return false
        }
        if (this.indCar == 'yes') {
          isLongPush = true
        }
      }
      // 爆弾にバッテリーが2本よりも多くついていてかつ「FRK」というインジケーターがある場合、ボタンを押してすぐに離す
      if (!isLongPush && this.button.name == 'white') {
        if (this.battery == 'unknown' || this.indFrk == 'unknown') {
          this.wantBattery = true
          this.wantIndFrk = true
          return false
        }
        if (this.battery == '3' && this.indFrk == 'yes') {
          return '押してすぐに離す'
        }
      }
      // ボタンが黄色ければ、ボタンを押したままで「ボタンを離すタイミング」を参照する
      if (!isLongPush && this.button.name == 'yellow') {
        isLongPush = true
      }
      // ボタンが赤くてかつ「長押し」と書かれている場合、ボタンを押してすぐに離す
      if (!isLongPush && this.button.name == 'red' && this.text.name == 'long') {
          return '押してすぐに離す'
      }
      // 上記のいずれもが該当しない場合、ボタンを押したままで「ボタンを離すタイミング」を参照する
      return '長押し'
    },
    indCar: {
      get() {
        return this.$store.state.additional.indCar
      },
      set(value) {
        this.$store.commit('additional/setIndCar', value)
      },
    },
    indFrk: {
      get() {
        return this.$store.state.additional.indFrk
      },
      set(value) {
        this.$store.commit('additional/setIndFrk', value)
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
  .font_black {
    color: black;
  }
  .active-button {
    font-size: large;
  }
</style>
