<template>
  <form @submit.prevent="submit" class="mt-6">
    <v-text-field
      v-model="code"
      :error-messages="codeErrors"
      label="Code barrière"
      required
    ></v-text-field>
    <v-btn class="mt-6" @click="submit" color="success">Valider</v-btn>
  </form>
</template>

<script>
export default {
  name: 'BarrierCodeForm',
  data: () => ({
    reduce: '',
    code: '',
    date: null,
    menu: false
  }),

  computed: {
    codeErrors () {
      return []
    },
    percentErrors () {
      return []
    },
    dateErrors () {
      return []
    }
  },
  methods: {
    submit () {
      this.$http.post(process.env.VUE_APP_BASE_API_URL + 'code/barrier/add', {
        code: this.code
      }).then(r => {
        console.log(r.data)
        this.$emit('tableUpdateEvent', r.data.code)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
