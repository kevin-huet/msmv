<template>
  <div>
    <Alert class="mt-3" v-if="this.error" icon="mdi-alert-circle" color="red" border="left" :text="this.errorMessage"></Alert>
    <form @submit.prevent="submit" class="mt-6">
      <v-text-field
        v-model="code"
        :error-messages="codeErrors"
        label="Code barrière"
        required
      ></v-text-field>
      <v-btn class="mt-6" @click="submit" color="success">Valider</v-btn>
    </form>
  </div>
</template>

<script>
import Alert from '@/components/Alert'
export default {
  name: 'BarrierCodeForm',
  components: { Alert },
  data: () => ({
    error: false,
    errorMessage: '',
    reduce: '',
    code: '',
    date: null,
    menu: false
  }),

  computed: {
    dialogState: {
      get () {
        return this.dialog
      },
      set (val) {
        this.$emit('close', val)
      }
    },
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
        console.log(r.data.code)
        this.error = false
        this.$emit('tableUpdateEvent', r.data.code)
        this.dialogState = false
      }).catch(err => {
        console.log(err)
        this.errorMessage = `Le code "${this.code}" existe déjà`
        this.error = true
      })
    }
  }
}
</script>

<style scoped>

</style>
