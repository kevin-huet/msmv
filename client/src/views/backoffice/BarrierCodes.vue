<template>
  <v-container>
    <v-card class="pa-4" color="grey lighten-4">
      <Breadcrumbs :items="routes"></Breadcrumbs>
      <v-row>
        <v-col cols="4">
          <v-text-field v-model="search" append-icon="mdi-magnify"
            label="Rechercher" single-line hide-details>
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-data-table :search="search" :headers="headers"
            :items="data" :items-per-page="5" class="elevation-1"
                        :header-props="{
              sortByText: 'Trier par'
            }"
                        :footer-props="{
              'page-text': '',
              'items-per-page-text':'Elements par page'
            }">
            <template v-slot:item.used="{ item }">
              {{ item.used ? 'Oui' : 'Non' }}
            </template>
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
            <template v-slot:no-data>
              Aucune donnée
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="12">
          <Modal @close="close" :dialog="dialog" btn-title="Ajouter un code">
            <BarrierCodeForm @close="close" :dialog="dialog" @tableUpdateEvent="tableUpdateEvent"/>
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
      dialog: false,
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
    close (event) {
      console.log(event)
      this.dialog = event
    },
    deleteItem (item) {
      this.$http.delete(process.env.VUE_APP_BASE_API_URL + 'code/barrier/delete', {
        data: {
          id: item._id
        }
      }).then(r => {
        console.log(r)
        this.editedIndex = this.data.indexOf(item)
        this.data.splice(this.editedIndex, 1)
      }).catch(err => {
        console.log(err)
      })
    },
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
