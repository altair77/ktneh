<template>
  <div>
    <v-container>
      <table><tr><td>
        <v-icon>mdi-cursor-default-click</v-icon>
      </td><td>
        <v-avatar
          v-for="key in keypads"
          :key="key.name"
          height="35" min-height="35"
          width="35" min-width="35"
          rounded
          @click="select(key)"
          class="keypad-avator"
        >
          <v-img
            :src="key.image"
            max-width="30" max-height="30"
            :gradient="gradient(key)"
          ></v-img>
        </v-avatar>
      </td></tr></table>
    </v-container>
    <v-container
      v-if="answer"
      class="d-flex"
    >
      <v-icon>mdi-check</v-icon>
      <v-avatar
        v-for="key in answer"
        :key="key.name"
        height="35" min-height="35"
        width="35" min-width="35"
        rounded
        class="keypad-avator"
      >
        <v-img
          :src="key.image"
          max-width="30" max-height="30"
        ></v-img>
      </v-avatar>
    </v-container>
  </div>
</template>

<script>
let keypads = {
  ae       : {name: 'ae',        image: require('~/assets/keypad/ae.png')},
  at       : {name: 'at',        image: require('~/assets/keypad/at.png')},
  blackstar: {name: 'blackstar', image: require('~/assets/keypad/blackstar.png')},
  bt       : {name: 'bt',        image: require('~/assets/keypad/bt.png')},
  c        : {name: 'c',         image: require('~/assets/keypad/c.png')},
  circlec  : {name: 'circlec',   image: require('~/assets/keypad/circlec.png')},
  cl       : {name: 'cl',        image: require('~/assets/keypad/cl.png')},
  face     : {name: 'face',      image: require('~/assets/keypad/face.png')},
  fork     : {name: 'fork',      image: require('~/assets/keypad/fork.png')},
  hatena   : {name: 'hatena',    image: require('~/assets/keypad/hatena.png')},
  husen    : {name: 'husen',     image: require('~/assets/keypad/husen.png')},
  insect   : {name: 'insect',    image: require('~/assets/keypad/insect.png')},
  ki       : {name: 'ki',        image: require('~/assets/keypad/ki.png')},
  lambda   : {name: 'lambda',    image: require('~/assets/keypad/lambda.png')},
  oshiri   : {name: 'oshiri',    image: require('~/assets/keypad/oshiri.png')},
  paragraph: {name: 'paragraph', image: require('~/assets/keypad/paragraph.png')},
  r        : {name: 'r',         image: require('~/assets/keypad/r.png')},
  roku     : {name: 'roku',      image: require('~/assets/keypad/roku.png')},
  sigma    : {name: 'sigma',     image: require('~/assets/keypad/sigma.png')},
  so       : {name: 'so',        image: require('~/assets/keypad/so.png')},
  triangle : {name: 'triangle',  image: require('~/assets/keypad/triangle.png')},
  turnc    : {name: 'turnc',     image: require('~/assets/keypad/turnc.png')},
  turne    : {name: 'turne',     image: require('~/assets/keypad/turne.png')},
  turnn    : {name: 'turnn',     image: require('~/assets/keypad/turnn.png')},
  whitestar: {name: 'whitestar', image: require('~/assets/keypad/whitestar.png')},
  xi       : {name: 'xi',        image: require('~/assets/keypad/xi.png')},
  xy       : {name: 'xy',        image: require('~/assets/keypad/xy.png')},
}

let orderSet = [
  [
    keypads.husen,
    keypads.at,
    keypads.lambda,
    keypads.so,
    keypads.triangle,
    keypads.xy,
    keypads.turnc,
  ],
  [
    keypads.turne,
    keypads.husen,
    keypads.turnc,
    keypads.cl,
    keypads.whitestar,
    keypads.xy,
    keypads.hatena,
  ],
  [
    keypads.circlec,
    keypads.oshiri,
    keypads.cl,
    keypads.xi,
    keypads.r,
    keypads.lambda,
    keypads.whitestar,
  ],
  [
    keypads.roku,
    keypads.paragraph,
    keypads.bt,
    keypads.triangle,
    keypads.xi,
    keypads.hatena,
    keypads.face,
  ],
  [
    keypads.fork,
    keypads.face,
    keypads.tb,
    keypads.c,
    keypads.paragraph,
    keypads.insect,
    keypads.blackstar,
  ],
  [
    keypads.roku,
    keypads.turne,
    keypads.ki,
    keypads.ae,
    keypads.fork,
    keypads.turnn,
    keypads.sigma,
  ],
]

export default {
  template: '<keypad-module>',
  data() {
    return {
      keypads: {
        ae       : {...keypads.ae,        state: 'off'},
        at       : {...keypads.at,        state: 'off'},
        blackstar: {...keypads.blackstar, state: 'off'},
        bt       : {...keypads.bt,        state: 'off'},
        c        : {...keypads.c,         state: 'off'},
        circlec  : {...keypads.circlec,   state: 'off'},
        cl       : {...keypads.cl,        state: 'off'},
        face     : {...keypads.face,      state: 'off'},
        fork     : {...keypads.fork,      state: 'off'},
        hatena   : {...keypads.hatena,    state: 'off'},
        husen    : {...keypads.husen,     state: 'off'},
        insect   : {...keypads.insect,    state: 'off'},
        ki       : {...keypads.ki,        state: 'off'},
        lambda   : {...keypads.lambda,    state: 'off'},
        oshiri   : {...keypads.oshiri,    state: 'off'},
        paragraph: {...keypads.paragraph, state: 'off'},
        r        : {...keypads.r,         state: 'off'},
        roku     : {...keypads.roku,      state: 'off'},
        sigma    : {...keypads.sigma,     state: 'off'},
        so       : {...keypads.so,        state: 'off'},
        triangle : {...keypads.triangle,  state: 'off'},
        turnc    : {...keypads.turnc,     state: 'off'},
        turne    : {...keypads.turne,     state: 'off'},
        turnn    : {...keypads.turnn,     state: 'off'},
        whitestar: {...keypads.whitestar, state: 'off'},
        xi       : {...keypads.xi,        state: 'off'},
        xy       : {...keypads.xy,        state: 'off'},
      },
    }
  },
  computed: {
    answer() {
      let keys = Object.values(this.keypads).filter(Boolean)
      let onKeys = keys.filter(k => k.state == 'on')
      if (onKeys.length != 4) {
        return false
      }

      return orderSet.filter(set => set.filter(Boolean).filter(k => this.keypads[k.name].state == 'on').length == 4)
        .flat(Infinity)
        .filter(Boolean)
        .filter(k => this.keypads[k.name].state == 'on')
    },
  },
  methods: {
    select(key) {
      let keys = Object.values(this.keypads).filter(Boolean)
      let onKeys = keys.filter(k => k.state == 'on')

      if (key.state == 'on') {
        key.state = 'off'
      } else if (onKeys.length >= 4) {
        return
      } else if (key.state == 'off') {
        key.state = 'on'
      }

      onKeys = keys.filter(k => k.state == 'on')
      orderSet.filter(set => set.filter(Boolean).filter(k => this.keypads[k.name].state == 'on').length != onKeys.length)
        .flat(Infinity)
        .filter(Boolean)
        .filter(k => this.keypads[k.name].state != 'on')
        .forEach(k => this.keypads[k.name].state = 'disable')
      orderSet.filter(set => set.filter(Boolean).filter(k => this.keypads[k.name].state == 'on').length == onKeys.length)
        .flat(Infinity)
        .filter(Boolean)
        .filter(k => this.keypads[k.name].state != 'on')
        .forEach(k => this.keypads[k.name].state = 'off')
      if (keys.every(k => k.state != 'on')) {
        keys.filter(k => k.state = 'off')
      }
    },
    gradient(key) {
      if (key.state == 'on') {
        return 'rgba(255,0,0,0.4),rgba(255,0,0,0.4)'
      }
      if (key.state == 'disable') {
        return 'rgba(0,0,0,0.4),rgba(0,0,0,0.4)'
      }
      return ''
    },
  },
}
</script>

<style scoped>
  .keypad-avator {
    cursor: pointer;
  }
</style>