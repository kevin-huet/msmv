<template>
  <v-alert
    :value="alert"
    :color="color"
    :border="border"
    :icon="icon"
    transition="scale-transition"
    dark
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: 'Alert',
  props: ['color', 'icon', 'border', 'alert', 'text']
}
</script>

<style scoped>

</style>
