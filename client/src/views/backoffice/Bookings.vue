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
          <v-data-table :search="search" :headers="headers" class="elevation-1"
            :items="data" :items-per-page="5"
            :header-props="{
              sortByText: 'Trier par'
            }"
            :footer-props="{
              'page-text': '',
              'items-per-page-text':'Elements par page'
            }">
            <template v-slot:item.createdAt="{ item }">
              {{ formatDate(item.createAt) }}
            </template>
            <template v-slot:item.visitDate="{ item }">
              {{ formatDate(item.visitDate) }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="12">
          <Modal btn-title="Ajouter une réservation" :component-name="componentName">
              <BookingForm></BookingForm>
          </Modal>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Breadcrumbs from '@/components/bars/Breadcrumbs'
import Modal from '@/components/Modal'
import BookingForm from '@/components/form/BookingForm'
import moment from 'moment'
export default {
  name: 'Bookings',
  components: { BookingForm, Modal, Breadcrumbs },
  data () {
    return {
      tabs: [
        { title: 'Standard' },
        { title: 'Rêve & Charme' }
      ],
      routes: [
        { text: 'Accueil Backoffice', disabled: false, exact: true, to: '/backoffice' },
        { text: 'Réservations', disabled: true, href: '/backoffice/bookings' }
      ],
      componentName: 'BookingForm',
      headers: [
        { text: 'Nom', value: 'lastname' },
        { text: 'Prenom', value: 'firstname' },
        { text: 'Email', value: 'email' },
        { text: 'Date visite', value: 'visitDate' },
        { text: 'Date création', value: 'createdAt' },
        { text: 'Prix', value: 'price' },
        { text: 'Forfaits', value: 'plan' },
        { text: 'Statut', value: 'price' },
        { text: 'Actions', value: 'actions' }
      ],
      dialog: false,
      search: '',
      data: [
      ]
    }
  },
  methods: {
    deleteItem (item) {
      console.log(item)
      this.$http.delete(process.env.VUE_APP_BASE_API_URL + 'booking/delete', {
        data: { id: item._id }
      }).then(r => {
        console.log(r)
      }).catch(err => {
        console.log(err)
      })
    },
    editItem (item) {
      console.log(item)
      this.$http.post('').then(r => {
        console.log(item)
      }).catch(err => {
        console.log(err)
      })
    },
    formatDate (value) {
      return moment(value).format('DD/MM/YYYY')
    }
  },
  mounted () {
    this.$http.get(process.env.VUE_APP_BASE_API_URL + 'booking/all').then(r => {
      this.data = r.data.bookings
      console.log(r)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
