<template>
    <v-navigation-drawer
      permanent
      app
      clipped
      right
      width="300"
    >
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="side-additional-title">
            追加情報
          </v-list-item-title>
          <v-list-item-subtitle>
            各フォームに入力
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ miss.label }}</v-list-item-title>
          <v-slider
            :min="miss.min"
            :max="miss.max"
            :ticks="miss.ticks"
            :tick-labels="miss.tickLabels"
            :tick-size="miss.tickSize"
            v-model="stateMiss"
          ></v-slider>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="attention in attentions"
        :key="attention.name"
      >
        <v-list-item-content>
          <additional-navi-button :attention="attention" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import AdditionalNaviButton from '~/components/AdditionalNaviButton'

export default {
  components: {
    AdditionalNaviButton
  },
  data() {
    return {
      miss: {
        label: "ミス回数",
        min: 0,
        max: 2,
        ticks: true,
        tickLabels: ["0", "1", "2"],
        tickSize: 3,
      },
      attentions: [
        {
          name: "snNumber",
          label: "SNの最後の数字",
          buttons: [{label: "不明", value: "unknown"}, {label: "奇数", value: "odd"}, {label: "偶数", value: "even"},],
        },
        {
          name: "snVowels",
          label: "SNの母音",
          buttons: [{label: "不明", value: "unknown"}, {label: "あり", value: "yes"}, {label: "なし", value: "no"},],
        },
        {
          name: "indCar",
          label: "INDのCAR",
          buttons: [{label: "不明", value: "unknown"}, {label: "あり", value: "yes"}, {label: "なし", value: "no"},],
        },
        {
          name: "indFrk",
          label: "INDのFRK",
          buttons: [{label: "不明", value: "unknown"}, {label: "あり", value: "yes"}, {label: "なし", value: "no"},],
        },
        {
          name: "battery",
          label: "バッテリの本数",
          buttons: [{label: "不明", value: "unknown"}, {label: "0", value: "0"}, {label: "1", value: "1"}, {label: "2", value: "2"}, {label: "3以上", value: "3"},],
        },
        {
          name: "parallel",
          label: "パラレルポート",
          buttons: [{label: "不明", value: "unknown"}, {label: "あり", value: "yes"}, {label: "なし", value: "no"},],
        },
      ],
    }
  },
  template: '<additional-navi>',
  computed: {
    stateMiss: {
      get() {
        return this.$store.state.additional.miss
      },
      set(value) {
        this.$store.commit('additional/setMiss', value)
      },
    },
  },
}
</script>