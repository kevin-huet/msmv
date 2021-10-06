<template>
  <v-footer
    color="grey lighten-4"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="grey lighten-2 py-4 text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Mont Saint Michel Voyages</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      links: [
        'Accueil',
        'Contact',
        'test'
      ]
    }
  }
}
</script>

<style scoped>

</style>
