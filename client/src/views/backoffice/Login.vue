<template>
  <v-container>
      <v-row dense>
        <v-col sm="12" md="6" offset-md="3">
          <v-card class="pb-4" color="grey lighten-4">
            <v-img
              class="white--text align-end"
              height="200px"
              :src="require('@/assets/msmv_banner.webp')"
            >
              <v-card-title>Backoffice - Connexion</v-card-title>
            </v-img>
            <v-col cols="8" offset="2">
              <LoginForm></LoginForm>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import LoginForm from '@/components/form/LoginForm'
export default {
  name: 'Login',
  components: { LoginForm }
}
</script>

<style scoped>

</style>
