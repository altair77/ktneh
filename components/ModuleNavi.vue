<template>
    <v-navigation-drawer permanent app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="side-module-title">
          モジュール
        </v-list-item-title>
        <v-list-item-subtitle>
          選択して追加
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list nav>
      <v-list-item
        v-for="module in moduleData.modules"
        :key="module.id"
        @click="addModule(module.name)"
        link
      >
        <v-list-item-content>
          <v-list-item-title>{{ module.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { eventBus } from '~/middleware/eventBus'
import Module from '~/components/Module'

export default {
  components: {
    Module,
  },
  data() {
    return {
      moduleData: Module.data(),
    }
  },
  template: '<module-navi>',
  methods: {
    addModule(type) {
      eventBus.$emit('addModule', type)
    },
  },
}
</script>