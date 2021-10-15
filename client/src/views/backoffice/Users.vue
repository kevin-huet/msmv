<template>
  <v-container>
    <v-card class="pa-4" color="grey lighten-4">
      <Breadcrumbs :items="routes"></Breadcrumbs>
      <v-row>
        <v-col cols="4">
          <v-text-field v-model="search"
                        append-icon="mdi-magnify"
                        label="Rechercher"
                        single-line
                        hide-details>
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-data-table
            :search="search"
            :headers="headers"
            :items="data"
            :items-per-page="5"
            class="elevation-1"
            :header-props="{
              sortByText: 'Trier par'
            }"
            :footer-props="{
              'page-text': '',
              'items-per-page-text':'Elements par page'
            }">
          </v-data-table>
        </v-col>
        <v-col cols="12">
          <Modal btn-title="Ajouter">
          </Modal>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Modal from '@/components/Modal'
import Breadcrumbs from '@/components/bars/Breadcrumbs'
export default {
  name: 'Users',
  components: { Breadcrumbs, Modal },

  data () {
    return {
      routes: [
        { text: 'Accueil Backoffice', disabled: false, exact: true, to: '/backoffice' },
        { text: 'Gestion utilisateurs', disabled: true, href: '' }
      ],
      search: '',
      headers: [
        { text: 'Email', value: 'email' },
        { text: 'Prenom', value: 'firstname' },
        { text: 'Nom', value: 'lastname' },
        { text: 'Role', value: 'role' }
      ],
      data: []
    }
  },
  mounted () {
    this.$http.get(process.env.VUE_APP_BASE_API_URL + 'users/all').then(r => {
      this.data = r.data.users
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
