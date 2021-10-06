<template>
  <v-container>
    <v-card class="pa-4" color="grey lighten-4">
      <Breadcrumbs :items="routes"></Breadcrumbs>
      <v-row>
        <v-col cols="4">
          <v-text-field v-model="search" append-icon="mdi-magnify"
            label="Search" single-line hide-details>
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-data-table :search="search" :headers="headers"
            :items="data" :items-per-page="5" class="elevation-1">
            <template v-slot:item.createdAt="{ item }">
              {{ formatDate(item.createdAt) }}
            </template>
            <template v-slot:item.email="{ item }">
              {{ (item.customer) ? item.customer.email : '' }}
            </template>
            <template v-slot:item.firstname="{ item }">
              {{ (item.customer) ? item.customer.firstname : '' }}
            </template>
            <template v-slot:item.lastname="{ item }">
              {{ (item.customer) ? item.customer.lastname : '' }}
            </template>
            <template v-slot:item.reason="{ item }">
              {{ (item.customer) ? item.customer.reason : '' }}
            </template>
            <template v-slot:item.phone="{ item }">
              {{ (item.customer) ? item.customer.phone : '' }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="12">
          <Modal btn-title="Ajouter un code">
            <BarrierCodeForm @tableUpdateEvent="tableUpdateEvent"/>
          </Modal>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Breadcrumbs from '@/components/bars/Breadcrumbs'
import Modal from '@/components/Modal'
import moment from 'moment'
import BarrierCodeForm from '@/components/form/BarrierCodeForm'
export default {
  name: 'BarrierCodes',
  components: { BarrierCodeForm, Modal, Breadcrumbs },
  data () {
    return {
      routes: [
        { text: 'Accueil Backoffice', disabled: false, exact: true, to: '/backoffice' },
        { text: 'Codes barrière', disabled: true, href: '/backoffice/code/barrier' }
      ],
      headers: [
        { text: 'Utilisé', value: 'used' },
        { text: 'Date création', value: 'createdAt' },
        { text: 'code', value: 'code' },
        { text: 'Date utilisé', value: 'usedAt' },
        { text: 'Tel', value: 'tel' },
        { text: 'Email', value: 'email' },
        { text: 'Nom', value: 'lastname' },
        { text: 'Prenom', value: 'firstname' },
        { text: 'Origine', value: 'origin' },
        { text: 'Motif', value: 'reason' },
        { text: 'Actions', value: 'actions' }
      ],
      search: '',
      data: [
      ]
    }
  },
  mounted () {
    this.$http.get(process.env.VUE_APP_BASE_API_URL + 'code/barrier/all').then(
      r => {
        console.log(r.data.barrierCodes)
        this.data = r.data.barrierCodes
      }
    ).catch(err => {
      console.log(err)
    })
  },
  methods: {
    tableUpdateEvent (event) {
      this.data.push(event)
    },
    formatDate (value) {
      return moment(value).format('DD/MM/YYYY')
    }
  }
}
</script>

<style scoped>

</style>
