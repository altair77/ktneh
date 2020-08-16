<template>
  <svg
    viewBox="0 0 100 100"
    width="100"
    height="100"
  >
    <defs>
      <symbol viewBox="-20 -20 40 40" id="oneWayArrow">
        <polygon
          points="0,-12 8,-4 4,-4 4,12 -4,12 -4,-4 -8,-4"
          fill="#1e1e1e"
        />
      </symbol>
      <symbol viewBox="-20 -20 40 40" id="twoWayArrow">
        <polygon
          points="0,-17 8,-9 4,-9 4,9 8,9 0,17 -8,9 -4,9 -4,-9 -8,-9"
          fill="#1e1e1e"
        />
      </symbol>
      <radialGradient id="blueGradient">
        <stop offset="0%" stop-color="#8888FF" />
        <stop offset="100%" stop-color="#2222FF" />
      </radialGradient>
      <radialGradient id="redGradient">
        <stop offset="0%" stop-color="#FF8888" />
        <stop offset="100%" stop-color="#FF2222" />
      </radialGradient>
      <radialGradient id="yellowGradient">
        <stop offset="0%" stop-color="#FFFF88" />
        <stop offset="100%" stop-color="#CCCC00" />
      </radialGradient>
      <radialGradient id="greenGradient">
        <stop offset="0%" stop-color="#88BB88" />
        <stop offset="100%" stop-color="#008800" />
      </radialGradient>
    </defs>
    <polygon
      points="50,50 75,25 50,0 25,25"
      fill="url(#blueGradient)"
      stroke="#444444"
      stroke-width="3"
    />
    <polygon
      points="25,75 0,50 25,25 50,50"
      fill="url(#redGradient)"
      stroke="#444444"
      stroke-width="3"
    />
    <polygon
      points="75,75 50,50 75,25 100,50"
      fill="url(#yellowGradient)"
      stroke="#444444"
      stroke-width="3"
    />
    <polygon
      points="50,100 75,75 50,50 25,75"
      fill="url(#greenGradient)"
      stroke="#444444"
      stroke-width="3"
    />
    <polygon
      points=""
      fill="orange"
      stroke="black" stroke-width="3"
    />
    <use
      v-if="(!vowel) && (miss == 0)"
      xlink:href="#oneWayArrow"
      x="30" y="30" width="40" height="40"
      transform="rotate(270,50,50)"
    />
    <use
      v-if="(!vowel) && (miss == 0)"
      xlink:href="#oneWayArrow"
      x="17.5" y="17.5" width="40" height="40"
      transform="rotate(45,37.5,37.5)"
    />
    <use
      v-if="(!vowel) && (miss == 0)"
      xlink:href="#oneWayArrow"
      x="42.5" y="17.5" width="40" height="40"
      transform="rotate(135,62.5,37.5)"
    />
    <use
      v-if="((!vowel) && (miss == 1)) || ((vowel) && (miss == 0))"
      xlink:href="#twoWayArrow"
      x="42.5" y="42.5" width="40" height="40"
      transform="rotate(45,62.5,62.5)"
    />
    <use
      v-if="((!vowel) && (miss == 2)) || ((vowel) && (miss == 1))"
      xlink:href="#twoWayArrow"
      x="30" y="30" width="40" height="40"
    />
    <use
      v-if="((!vowel) && (miss == 2)) || ((vowel) && (miss == 1))"
      xlink:href="#twoWayArrow"
      x="30" y="30" width="40" height="40"
      transform="rotate(90,50,50)"
    />
    <use
      v-if="(vowel) && (miss == 0)"
      xlink:href="#twoWayArrow"
      x="17.5" y="17.5" width="40" height="40"
      transform="rotate(45,37.5,37.5)"
    />
    <use
      v-if="(vowel) && (miss == 2)"
      xlink:href="#oneWayArrow"
      x="17.5" y="17.5" width="40" height="40"
      transform="rotate(225,37.5,37.5)"
    />
    <use
      v-if="(vowel) && (miss == 2)"
      xlink:href="#oneWayArrow"
      x="17.5" y="42.5" width="40" height="40"
      transform="rotate(135,37.5,62.5)"
    />
    <use
      v-if="(vowel) && (miss == 2)"
      xlink:href="#oneWayArrow"
      x="42.5" y="42.5" width="40" height="40"
      transform="rotate(45,62.5,62.5)"
    />
    <use
      v-if="(vowel) && (miss == 2)"
      xlink:href="#oneWayArrow"
      x="42.5" y="17.5" width="40" height="40"
      transform="rotate(315,62.5,37.5)"
    />
  </svg>
</template>

<script>
export default {
  template: '<simon-image>',
  props: [
    'vowel',
    'miss',
  ],
  data() {
    return {

    }
  },
}
</script>