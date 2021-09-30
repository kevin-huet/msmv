<template>
  <v-container>
    <v-card class="pa-4" color="grey lighten-4">
      <Breadcrumbs :items="routes"></Breadcrumbs>
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
              <component :is="componentName"></component>
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
export default {
  name: 'Bookings',
  components: { BookingForm, Modal, Breadcrumbs },
  data () {
    return {
      routes: [
        { text: 'Accueil Backoffice', disabled: false, href: '/backoffice' },
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
  }
}
</script>

<style scoped>

</style>
