<template>
  <div>
    <v-container>
      <v-row
        v-for="input in inputs"
        :key="input.id"
        dense
      >
        <v-icon>mdi-cursor-default-click</v-icon>
        <v-col>
          <v-text-field
            v-model.number="input.display"
            @input="inputed"
            type="tel"
            label="display"
            :prepend-icon="'mdi-numeric-' + (input.id+1) + '-box'"
            dense
            hide-details
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model.number="input.buttons"
            @input="inputed"
            type="tel"
            label="button"
            dense
            hide-details
          />
        </v-col>
        <v-col align-self="center">
          <v-icon>mdi-check</v-icon>
          <v-avatar
            v-if="input.answer"
            color="blue darken-4"
            size="24"
          >
            {{input.answer[1]}}
          </v-avatar>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const answerFuncs = new Map()
// ディスプレーが1の場合、二番目のボタンを押す。
answerFuncs.set('0,1', inputs => inputs[0].answer = [1, inputs[0].buttons.toString(10).charAt(1) - 0])
// ディスプレーが2の場合、二番目のボタンを押す。
answerFuncs.set('0,2', inputs => inputs[0].answer = [1, inputs[0].buttons.toString(10).charAt(1) - 0])
// ディスプレーが3の場合、三番目のボタンを押す。
answerFuncs.set('0,3', inputs => inputs[0].answer = [2, inputs[0].buttons.toString(10).charAt(2) - 0])
// ディスプレーが4の場合、四番目のボタンを押す。
answerFuncs.set('0,4', inputs => inputs[0].answer = [3, inputs[0].buttons.toString(10).charAt(3) - 0])
// ディスプレーが1の場合、「4」と書かれたボタンを押す。
answerFuncs.set('1,1', inputs => inputs[1].answer = [inputs[1].buttons.toString(10).indexOf('4'), 4])
// ディスプレーが2の場合、ステージ1で押したのと同じ位置のボタンを押す。
answerFuncs.set('1,2', inputs => {
  let stage1 = inputs[0].answer
  inputs[1].answer = [stage1[0], inputs[1].buttons.toString(10).charAt(stage1[0]) - 0]
})
// ディスプレーが3の場合、一番目のボタンを押す。
answerFuncs.set('1,3', inputs => inputs[1].answer = [0, inputs[1].buttons.toString(10).charAt(0) - 0])
// ディスプレーが4の場合、ステージ1で押したのと同じ位置のボタンを押す。
answerFuncs.set('1,4', inputs => {
  let stage1 = inputs[0].answer
  inputs[1].answer = [stage1[0], inputs[1].buttons.toString(10).charAt(stage1[0]) - 0]
})
// ディスプレーが1の場合、ステージ2で押したのと同じラベルのボタンを押す。
answerFuncs.set('2,1', inputs => {
  let stage2 = inputs[1].answer
  inputs[2].answer = [inputs[2].buttons.toString(10).indexOf(stage2[1]), stage2[1]]
})
// ディスプレーが2の場合、ステージ1で押したのと同じラベルのボタンを押す。
answerFuncs.set('2,2', inputs => {
  let stage1 = inputs[0].answer
  inputs[2].answer = [inputs[2].buttons.toString(10).indexOf(stage1[1]), stage1[1]]
})
// ディスプレーが3の場合、三番目のボタンを押す。
answerFuncs.set('2,3', inputs => inputs[2].answer = [2, inputs[2].buttons.toString(10).charAt(2) - 0])
// ディスプレーが4の場合、「4」と書かれたボタンを押す。
answerFuncs.set('2,4', inputs => inputs[2].answer = [inputs[2].buttons.toString(10).indexOf('4'), 4])
// ディスプレーが1の場合、ステージ1で押したのと同じ位置のボタンを押す。
answerFuncs.set('3,1', inputs => {
  let stage1 = inputs[0].answer
  inputs[3].answer = [stage1[0], inputs[3].buttons.toString(10).charAt(stage1[0]) - 0]
})
// ディスプレーが2の場合、一番目のボタンを押す。
answerFuncs.set('3,2', inputs => inputs[3].answer = [0, inputs[3].buttons.toString(10).charAt(0) - 0])
// ディスプレーが3の場合、ステージ2で押したのと同じ位置のボタンを押す。
answerFuncs.set('3,3', inputs => {
  let stage2 = inputs[1].answer
  inputs[3].answer = [stage2[0], inputs[3].buttons.toString(10).charAt(stage2[0]) - 0]
})
// ディスプレーが4の場合、ステージ2で押したのと同じ位置のボタンを押す。
answerFuncs.set('3,4', inputs => {
  let stage2 = inputs[1].answer
  inputs[3].answer = [stage2[0], inputs[3].buttons.toString(10).charAt(stage2[0]) - 0]
})
// ディスプレーが1の場合、ステージ1で押したのと同じラベルのボタンを押す。
answerFuncs.set('4,1', inputs => {
  let stage1 = inputs[0].answer
  inputs[4].answer = [inputs[4].buttons.toString(10).indexOf(stage1[1]), stage1[1]]
})
// ディスプレーが2の場合、ステージ2で押したのと同じラベルのボタンを押す。
answerFuncs.set('4,2', inputs => {
  let stage2 = inputs[1].answer
  inputs[4].answer = [inputs[4].buttons.toString(10).indexOf(stage2[1]), stage2[1]]
})
// ディスプレーが3の場合、ステージ4で押したのと同じラベルのボタンを押す。
answerFuncs.set('4,3', inputs => {
  let stage4 = inputs[3].answer
  inputs[4].answer = [inputs[4].buttons.toString(10).indexOf(stage4[1]), stage4[1]]
})
// ディスプレーが4の場合、ステージ3で押したのと同じラベルのボタンを押す。
answerFuncs.set('4,4', inputs => {
  let stage3 = inputs[2].answer
  inputs[4].answer = [inputs[4].buttons.toString(10).indexOf(stage3[1]), stage3[1]]
})

export default {
  template: '<memory-module>',
  data() {
    return {
      inputs: [
        {id: 0, display: '', buttons: '', answer: false},
        {id: 1, display: '', buttons: '', answer: false},
        {id: 2, display: '', buttons: '', answer: false},
        {id: 3, display: '', buttons: '', answer: false},
        {id: 4, display: '', buttons: '', answer: false},
      ],
    }
  },
  methods: {
    inputed() {
      for (let i of this.inputs) {
        if (i.display < 1 || i.display > 4) {
          i.answer = false
          return
        }
        let pattern = /^[1-4]{4}$/
        if (!pattern.test(i.buttons.toString(10))) {
          i.answer = false
          return
        }
        answerFuncs.get([i.id, i.display].join(','))(this.inputs)
      }
    },
  },
}
</script>
