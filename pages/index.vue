<template>
  <v-app dark>
    <loading :loading="loading" />
    <additional-navi />
    <module-navi />
    <v-main>
      <module-work />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loading = false
    })
  },
}
</script>
