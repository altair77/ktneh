<template>
  <div>
    <v-container>
      <v-row
        v-for="(char, index) in chars"
        :key="index"
        dense
      >
        <v-icon>mdi-cursor-default-click</v-icon>
        <v-col>
          <v-text-field
            v-model.number="char.keywords"
            @input="inputed"
            type="email"
            label="character"
            :prepend-icon="'mdi-numeric-' + (char.id+1) + '-box'"
            dense
            hide-details
          />
        </v-col>
        <v-col>
          <div v-if="possibilities[index].length > 5">
            <v-chip color="blue darken-4">{{possibilities[index].length}} 種</v-chip>
          </div>
          <div v-else>
            <v-chip
              v-for="(ps, pi) in possibilities[index]"
              :key="pi"
              color="blue darken-2 possibility"
              class="mr-1"
            >
              {{ps}}
            </v-chip>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      v-if="answer"
    >
      <table><tr><td>
        <v-icon class="mr-2">mdi-check</v-icon>
      </td><td>
        <v-chip color="blue darken-2">
          {{answer}}
        </v-chip>
      </td></tr></table>
    </v-container>
  </div>
</template>

<script>
const words = [
  'about', 'after', 'again', 'below', 'could',
  'every', 'first', 'found', 'great', 'house',
  'large', 'learn', 'never', 'other', 'place',
  'plant', 'point', 'right', 'small', 'sound',
  'spell', 'still', 'study', 'their', 'there',
  'these', 'thing', 'think', 'three', 'water',
  'where', 'which', 'world', 'would', 'write',
]

export default {
  template: 'password-module',
  data() {
    return {
      chars: [
        {id: 0, keywords: ''},
        {id: 1, keywords: ''},
        {id: 2, keywords: ''},
        {id: 3, keywords: ''},
        {id: 4, keywords: ''},
      ],
    }
  },
  computed: {
    answers() {
      let ws = [...words]
      this.chars.forEach((char, i) => {
        if (char.keywords) {
          let pattern = new RegExp('^.{' + i + '}[' + char.keywords + '].{' + (4 - i) + '}$')
          ws = ws.filter(w => pattern.test(w))
        }
      })
      return ws
    },
    answer() {
      if (this.answers.length === 1) {
        return this.answers[0]
      }
      return false
    },
    possibilities() {
      let ps = []
      for (let i of Array(5).keys()) {
        let chars = this.answers.map(a => a.charAt(i)).filter((c, i, arr) => arr.indexOf(c) === i)
        ps.push(chars)
      }
      return ps
    }
  },
  methods: {
    inputed() {

    },
  },
}
</script>

<style scoped>
  .possibility {
    font-family: Consolas, 'Courier New', Courier, monospace;
    font-size: 16px;
    font-weight: 500;
  }
</style>
