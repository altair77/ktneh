<template>
  <v-col
    md="6"
    xs="12"
  >
    <v-card
      elevation="2"
    >
      <v-system-bar window>
        <span>{{ moduleLabel }}</span>
        <v-spacer></v-spacer>
        <v-icon
          @click="deleteModule(id)"
        >
          mdi-close
        </v-icon>
      </v-system-bar>
      <component :is="tag"></component>
    </v-card>
  </v-col>
</template>

<script>
import { eventBus } from '~/middleware/eventBus'
import Module from '~/components/Module'
import WireModule from '~/components/WireModule'
import ButtonModule from '~/components/ButtonModule'
import KeypadModule from '~/components/KeypadModule'
import SimonModule from '~/components/SimonModule'
import TableModule from '~/components/TableModule'
import MemoryModule from '~/components/MemoryModule'
import MorlsModule from '~/components/MorlsModule'
import ComplexWireModule from '~/components/ComplexWireModule'
import OrderedWireModule from '~/components/OrderedWireModule'
import MazeModule from '~/components/MazeModule'
import PasswordModule from '~/components/PasswordModule'

export default {
  components: {
    WireModule,
    ButtonModule,
    KeypadModule,
    SimonModule,
    TableModule,
    MemoryModule,
    MorlsModule,
    ComplexWireModule,
    OrderedWireModule,
    MazeModule,
    PasswordModule,
  },
  props: ['id', 'type'],
  data() {
    return {
      moduleLabel: "",
      tag: "",
    }
  },
  template: '<module-frame>',
  created() {
    for (let module of Module.data().modules) {
      if (module.name == this.type) {
        this.moduleLabel = module.title
        this.tag = this.type + '-module'
        return
      }
    }
  },
  methods: {
    deleteModule(id) {
      eventBus.$emit('deleteModule', id)
    },
  },
}
</script>