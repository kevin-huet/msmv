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
            @click:row="enterSelect"
            class="elevation-1"
            :header-props="{
              sortByText: 'Trier par'
            }"
            :footer-props="{
              'page-text': '',
              'items-per-page-text':'Elements par page'
            }">
            <template v-slot:item.role="{ item }">
              <v-select :disabled="user === item._id" class="fit" outlined dense
                        v-model="item.role" :items="selectItems" @change="updateRole"
              ></v-select>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon :disabled="user === item._id" small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="12">
          <Modal @close="close" :dialog="dialog" btn-title="Ajouter">
            <CreateUserForm @addUser="addUser" @close="close" :dialog="dialog"></CreateUserForm>
          </Modal>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Modal from '@/components/Modal'
import Breadcrumbs from '@/components/bars/Breadcrumbs'
import CreateUserForm from '../../components/form/CreateUserForm'
export default {
  name: 'Users',
  components: { CreateUserForm, Breadcrumbs, Modal },

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
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions'}
      ],
      data: [],
      selectItems: [
        'ROLE_ADMIN',
        'ROLE_USER'
      ],
      dialog: false,
      clickItem: {},
      user: ''
    }
  },
  methods: {
    enterSelect (item) {
      this.clickItem = item
    },
    updateRole (role) {

    },
    deleteItem (item) {
      this.$http.delete(process.env.VUE_APP_BASE_API_URL + 'user/delete', {
        data: { id: item._id }
      })
    },
    editItem () {},
    addUser (user) {
      this.data.push(user)
    },
    close (event) {
      this.dialog = event
    }
  },
  mounted () {
    this.user = this.$store.state.user
    console.log(this.user)
    this.$http.get(process.env.VUE_APP_BASE_API_URL + 'users/all').then(r => {
      this.data = r.data.users
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.v-select.fit {
  margin-bottom: -20px;
  margin-top: 6px;
  padding: 0 !important;
  max-width: 200px!important;
}
.v-select.fit  .v-select__selection--comma {
  text-overflow: unset;
}
</style>
