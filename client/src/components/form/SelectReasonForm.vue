<template>
  <form @submit.prevent="submit" class="mt-6">
    <v-select
      :items="items"
      label="Motif"
      dense
    ></v-select>
    <v-btn class="mt-6" color="success">Valider</v-btn>
  </form>
</template>

<script>
export default {
  name: 'SelectReasonForm',
  data () {
    return {
      items: [
        'Nouvelle visite',
        'Code érroné',
        'Code supplémentaire (2 voitures et +)',
        'Oublie du code'
      ]
    }
  },
  methods: {
    submit () {

    }
  }
}
</script>

<style scoped>

</style>
