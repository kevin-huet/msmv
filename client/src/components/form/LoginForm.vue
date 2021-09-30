<template>
  <form>
    <v-text-field
      :error-messages="emailErrors"
      label="Email"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      :error-messages="passwordErrors"
      label="password"
      required
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show ? 'text' : 'password'"
      @click:append="show = !show"
    ></v-text-field>
    <v-btn color="success" class="mr-4" @click="submit">submit</v-btn>
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
    email: { required, email },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },

  data: () => ({
    email: '',
    show: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => ("The email and password you entered don't match")
    }
  }),

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
  },

  methods: {
    submit () {
      this.$v.$touch()
    }
  }
}
</script>

<style scoped>

</style>
