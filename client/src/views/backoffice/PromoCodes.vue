<template>
  <v-container>
    <v-card class="pa-4" color="grey lighten-4">
      <Breadcrumbs :items="routes"></Breadcrumbs>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="search"
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
            :items-per-page="10"
            :header-props="{
              sortByText: 'Trier par'
            }"
            :footer-props="{
              'page-text': '',
              'items-per-page-text':'Elements par page'
            }"
            class="elevation-1">
            <template v-slot:item.createAt="{ item }">
              {{ formatDate(item.createAt) }}
            </template>
            <template v-slot:item.expiration="{ item }">
              {{ formatDate(item.expiration) }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="12">
          <Modal btn-title="Ajouter un code">
            <PromoCodeForm @tableUpdateEvent="tableUpdateEvent"></PromoCodeForm>
          </Modal>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Breadcrumbs from '@/components/bars/Breadcrumbs'
import Modal from '@/components/Modal'
import PromoCodeForm from '@/components/form/PromoCodeForm'
import moment from 'moment'
export default {
  name: 'PromoCodes',
  components: { Modal, Breadcrumbs, PromoCodeForm },
  methods: {
    tableUpdateEvent (event) {
      this.data.push(event)
    },
    formatDate (value) {
      return moment(value).format('DD/MM/YYYY')
    },
    editItem (item) {

    },
    deleteItem (item) {
      this.$http.delete(process.env.VUE_APP_BASE_API_URL + 'code/promo/delete', {
        data: {
          id: item._id
        }
      }).then(r => {
        console.log(r)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  data () {
    return {
      componentName: 'PromoCodeForm',
      routes: [
        { text: 'Accueil Backoffice', disabled: false, exact: true, to: '/backoffice' },
        { text: 'Codes promo', disabled: true, href: '/backoffice/code/promo' }
      ],
      headers: [
        { text: 'Code', value: 'code' },
        { text: 'Reduction', value: 'amount' },
        { text: 'Créé le', value: 'createAt' },
        { text: "Valide jusqu'au", value: 'expiration' },
        { text: 'Actions', value: 'actions' }
      ],
      search: '',
      data: [
      ]
    }
  },
  mounted () {
    this.$http.get(process.env.VUE_APP_BASE_API_URL + 'code/promo/all').then(r => {
      this.data = r.data.promoCodes
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
