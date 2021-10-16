<template>
  <form @submit.prevent="submit" class="mt-6">
    <v-text-field
      v-model="code"
      :error-messages="codeErrors"
      label="Code promo"
      required
    ></v-text-field>
    <v-text-field
      v-model="reduce"
      :error-messages="percentErrors"
      label="Pourcentage"
      required
      type="number"
    ></v-text-field>

    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Date d'expiration"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        no-title
        scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="menu = false"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.menu.save(date)"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-menu>

    <v-btn class="mt-6" @click="submit" color="success">Valider</v-btn>
  </form>
</template>

<script>

export default {
  name: 'PromoCodeForm',

  data: () => ({
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
    save (date) {
      this.$refs.menu.save(date)
    },
    submit () {
      this.$http.post(process.env.VUE_APP_BASE_API_URL + 'code/promo/add', {
        code: this.code,
        reduce: this.reduce,
        expiration: this.date
      }).then(r => {
        console.log(r.data)
        this.$emit('tableUpdateEvent', r.data.promoCode)
        this.dialogState = false
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
