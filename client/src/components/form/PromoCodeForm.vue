<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="codeErrors"
      :counter="10"
      label="Code promo"
      required
      value=""
    ></v-text-field>
    <v-text-field
      :error-messages="percentErrors"
      label="Pourcentage"
      value=""
      required
    ></v-text-field>

    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Birthday date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        :active-picker.sync="activePicker"
        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>

    <v-btn class="mr-4" @click="submit">submit</v-btn>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, maxLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'PromoCodeForm',
  mixins: [validationMixin],
  model: {
    prop: '$value',
    event: 'change'
  },
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },

  data: () => ({
    activePicker: null,
    date: null,
    menu: false,
    dateFormatted: null,
    open: false,
    name: '',
    email: '',
    checkbox: false
  }),

  computed: {
    codeErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
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
    update () {
      this.$emit('change', this.dateFormatted)
    },
    submit () {
      this.$v.$touch()
    }
  }
}
</script>

<style scoped>

</style>
