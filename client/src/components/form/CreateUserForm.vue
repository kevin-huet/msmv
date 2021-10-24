<template>
  <form class="login" @submit.prevent="addUser">
    <v-text-field
      v-model="email"
      label="Email"
      required
    ></v-text-field>
    <v-text-field
      v-model="firstname"
      label="Prenom"
      required
    ></v-text-field>
    <v-text-field
      v-model="lastname"
      label="Nom"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Mot de passe"
      required
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show ? 'text' : 'password'"
      @click:append="show = !show"
    ></v-text-field>
    <v-select class="fit" outlined dense
              v-model="role" :items="selectItems"
    ></v-select>
    <v-btn color="success" class="mr-4" type="submit">Connexion</v-btn>
  </form>
</template>

<script>
export default {
  name: 'CreateUserForm',
  data () {
    return {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      role: 'ROLE_USER',
      show: false,
      error: false,
      selectItems: [
        'ROLE_ADMIN',
        'ROLE_USER'
      ]
    }
  },
  computed: {
    dialogState: {
      get () {
        return this.dialog
      },
      set (val) {
        this.$emit('close', val)
      }
    }
  },
  methods: {
    addUser () {
      console.log(this.password)
      this.$http.post(process.env.VUE_APP_BASE_API_URL + 'auth/create-user', {
        email: this.email, firstname: this.firstname, lastname: this.lastname, password: this.password, role: this.role
      }).then(r => {
        this.dialogState = false
        this.error = false
        this.$emit('addUser', r.data.user)
      }).catch(err => {
        this.error = true
      })
    }
  }
}
</script>

<style scoped>

</style>
