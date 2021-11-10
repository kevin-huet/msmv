<template>
  <v-container>
    <v-card class="pa-4" color="grey lighten-4">
      <Breadcrumbs :items="routes"></Breadcrumbs>
      <Alert v-if="this.disabled" icon="mdi-alert-circle" color="red" border="left" :text="priceNotDefined"></Alert>
      <v-row>
        <v-col cols="4">
          <v-text-field v-model="search"
            append-icon="mdi-magnify"
            label="Rechercher"
            single-line
            hide-details>
          </v-text-field>
        </v-col>
        <v-col cols="12" >
          <v-data-table :search="search" :headers="headers" class="elevation-1"
            :items="data" :items-per-page="5" @click:row="enterSelect"
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
            <template v-slot:item.childPlan="{ item }">
              {{ item.plans.standard.child }}
            </template>
            <template v-slot:item.youngPlan="{ item }">
              {{ item.plans.standard.young }}
            </template>
            <template v-slot:item.adultPlan="{ item }">
              {{ item.plans.standard.adult }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:item.status="{ item }">
              <v-select class="fit" outlined dense
                v-model="item.status" :items="selectItems" @change="updateStatus"
              ></v-select>
            </template>
            <template v-slot:no-data>
              Aucune donnée
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="12">
          <Modal @close="close" :dialog="dialog" btn-title="Ajouter une réservation" :component-name="componentName" :disabled="this.disabled">
              <BookingForm @close="close" @addBooking="addBooking" :dialog="dialog" :planPrices="this.planPrices"></BookingForm>
          </Modal>
        </v-col>
        <v-snackbar v-model="snackbar" color="primary" timeout="1500" :top=true>
          Le statut a bien été modifié
          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbar = false">
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Breadcrumbs from '@/components/bars/Breadcrumbs'
import Modal from '@/components/Modal'
import BookingForm from '@/components/form/BookingForm'
import moment from 'moment'
import Alert from '@/components/Alert'
export default {
  name: 'Bookings',
  components: { Alert, BookingForm, Modal, Breadcrumbs },
  data () {
    return {
      snackbar: false,
      clickItem: {},
      priceNotDefined: "Les prix ne sont pas défini. Veuillez les définir avant d'ajouter de nouvelles réservations",
      disabled: false,
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
        { text: 'Enfant', value: 'childPlan' },
        { text: 'Jeune', value: 'youngPlan' },
        { text: 'Adulte', value: 'adultPlan' },
        { text: 'Véhicules', value: 'vehicles' },
        { text: 'Statut', value: 'status' },
        { text: 'Actions', value: 'actions' }
      ],
      dialog: false,
      search: '',
      data: [
      ],
      selectItems: [
        'En attente',
        'Enregistrée',
        'Livrée'
      ],
      planPrices: null
    }
  },
  methods: {
    updateStatus (value) {
      this.$http.put(process.env.VUE_APP_BASE_API_URL + 'booking/update-status', {
        id: this.clickItem._id,
        status: value
      }).then(r => {
        console.log(r)
        this.snackbar = true
      }).catch(err => {
        console.log(err)
      })
    },
    enterSelect (item) {
      this.clickItem = item
    },
    close (event) {
      this.dialog = event
    },
    addBooking (item) {
      this.data.push(item)
    },
    deleteItem (item) {
      this.$http.delete(process.env.VUE_APP_BASE_API_URL + 'booking/delete', {
        data: { id: item._id }
      }).then(r => {
        console.log(r)
        this.editedIndex = this.data.indexOf(item)
        this.data.splice(this.editedIndex, 1)
      }).catch(err => {
        console.log(err)
      })
    },
    editItem (item) {
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
      console.log(r.data.bookings)
      this.data = r.data.bookings
    }).catch(err => {
      console.log(err)
    })

    this.$http.get(process.env.VUE_APP_BASE_API_URL + 'booking/prices/standard')
      .then((res) => {
        this.planPrices = res.data.prices
        for (const [index, value] of Object.entries(this.planPrices)) {
          if (value === null || value === undefined || index === '') {
            this.disabled = true
          }
        }
      }).catch(err => console.log(err))
  }
}
</script>

<style scoped>
.v-select.fit {
  margin-bottom: -20px;
  margin-top: 6px;
  padding: 0 !important;
  max-width: 133px!important;
}
.v-select.fit  .v-select__selection--comma {
  text-overflow: unset;
}
</style>
