<template>
  <v-container>
    <v-card class="pa-4" color="grey lighten-4">
      <Breadcrumbs :items="routes"></Breadcrumbs>
      <Tabs class="my-3" :tabs-data="tabs"></Tabs>
      <v-row>
        <v-col cols="4">
          <v-text-field v-model="search"
            append-icon="mdi-magnify"
            label="Search"
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
            class="elevation-1">
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
import Tabs from '@/components/Tabs'
export default {
  name: 'Bookings',
  components: { Tabs, BookingForm, Modal, Breadcrumbs },
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
        { text: 'Nom', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Date visite', value: 'visiteDate' },
        { text: 'Date création', value: 'createdAt' },
        { text: 'Prix', value: 'price' },
        { text: 'Forfaits', value: 'plan' },
        { text: 'Statut', value: 'price' },
        { text: 'Actions', value: 'price' }
      ],
      dialog: false,
      search: '',
      data: [
        { name: 'test' },
        { name: 'zebi' }
      ]
    }
  },
  mounted () {
    this.$http.get(process.env.VUE_APP_BASE_API_URL + 'booking/all').then(r => {
      console.log(r)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
