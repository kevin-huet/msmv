<template>
  <v-container>
    <v-card class="pa-4" color="grey lighten-4">
      <Breadcrumbs :items="routes"></Breadcrumbs>
      <v-row dense>
        <v-col cols="12" sm="6" md="6" lg="6" v-for="category in categories" v-bind:key="category.index">
        <BackofficeCategory class="my-4"
                            :title="category.title"
                            :description="category.description"
                            :link="category.link"
                            :icon="category.icon"
                            :disabled="category.disabled"/>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import BackofficeCategory from '@/components/BackofficeCategory'
import Breadcrumbs from '@/components/bars/Breadcrumbs'
export default {
  name: 'Home',
  components: { Breadcrumbs, BackofficeCategory },
  data () {
    return {
      routes: [
        { text: 'Accueil Backoffice', disabled: true, href: '/backoffice' }
      ],
      categories: [
        { title: 'Reservations', description: '', link: '/backoffice/bookings', icon: ' mdi-book-open-variant' },
        { title: 'Code promo', description: '', link: '/backoffice/code/promo', icon: 'mdi-currency-usd-off' },
        { title: 'Code Barrière', description: '', link: '/backoffice/code/barrier', icon: 'mdi-barcode-scan' },
        { title: 'Edition des prix', description: '', link: '/backoffice/pricing', icon: 'mdi-store' },
        { title: 'Edition du mail de reservation', description: '', link: '/backoffice/bookings/mailing', icon: 'mdi-email-edit', disabled: true },
        { title: 'Gestion utilisateurs', description: '', link: '/backoffice/users', icon: 'mdi-account', disabled: true }
      ]
    }
  }
}
</script>

<style scoped>

</style>
