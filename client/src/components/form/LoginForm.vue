<template>
  <div>
    <Alert class="mt-3" v-if="this.error" icon="mdi-alert-circle" color="red" border="left" :text="this.errorMessage"></Alert>
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
      label="Mot de passe"
      required
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show ? 'text' : 'password'"
      @click:append="show = !show"
    ></v-text-field>
    <v-btn color="success" class="mr-4" type="submit">Connexion</v-btn>
  </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, maxLength, required } from 'vuelidate/lib/validators'
import Alert from '../Alert'

export default {
  name: 'LoginForm',
  components: {Alert},
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email }
  },

  data () {
    return {
      email: '',
      password: '',
      show: false,
      error: false,
      errorMessage: 'Email ou mot de passe incorrect. Veuillez réessayer.'
    }
  },

  methods: {
    login: function () {
      const email = this.email
      const password = this.password
      this.$store.dispatch('login', { email, password })
        .then(() => this.$router.push('/backoffice'))
        .catch(err => {
          this.error = true
        })
    }
  },

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Votre email doit être valide')
      !this.$v.email.required && errors.push('Ce champ est requis')
      return errors
    },
    passwordErrors () {
      return []
    }
  }
}
</script>
