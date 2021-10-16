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
          <Modal @close="close" :dialog="dialog" btn-title="Ajouter">
            <EditPriceForm @close="close" :dialog="dialog" :planPrices="prices"></EditPriceForm>
          </Modal>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Modal from '@/components/Modal'
import axios from 'axios'
import Breadcrumbs from '@/components/bars/Breadcrumbs'
import EditPriceForm from '@/components/form/EditPriceForm'
export default {
  name: 'Pricing',
  components: { EditPriceForm, Breadcrumbs, Modal },

  data () {
    return {
      dialog: false,
      routes: [
        { text: 'Accueil Backoffice', disabled: false, exact: true, to: '/backoffice' },
        { text: 'Gestion des prix', disabled: true, href: '/backoffice/pricing' }
      ],
      headers: [
        { text: 'Nom forfait', value: 'plan' },
        { text: 'Prix', value: 'price' }
      ],
      search: '',
      data: [],
      prices: {
        child: 0,
        adult: 0,
        young: 0
      }
    }
  },
  methods: {
    close (event) {
      console.log(event)
      this.dialog = event
    }
  },
  mounted () {
    console.log(process.env.VUE_APP_BASE_API_URL)
    axios.get(process.env.VUE_APP_BASE_API_URL + 'booking/prices/standard')
      .then(r => {
        this.prices = r.data.prices
        this.data = [
          { plan: 'Enfant', price: this.prices.child ? this.prices.child.price : 'Non défini' },
          { plan: 'Jeune', price: this.prices.young ? this.prices.young.price : 'Non défini' },
          { plan: 'Adulte', price: this.prices.adult ? this.prices.adult.price : 'Non défini' }
        ]
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>

</style>
