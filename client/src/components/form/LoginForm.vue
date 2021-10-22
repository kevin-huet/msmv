<template>
  <form class="login" @submit.prevent="login">
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="Email"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      label="password"
      required
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show ? 'text' : 'password'"
      @click:append="show = !show"
    ></v-text-field>
    <v-btn color="success" class="mr-4" type="submit">submit</v-btn>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, maxLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'LoginForm',
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email }
  },

  data: () => ({
    email: '',
    password: '',
    show: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => ("The email and password you entered don't match")
    }
  }),

  methods: {
    login: function () {
      const email = this.email
      const password = this.password
      this.$store.dispatch('login', { email, password })
        .then(() => this.$router.push('/backoffice'))
        .catch(err => console.log(err))
    }
  },

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      return []
    }
  }
}
</script>
