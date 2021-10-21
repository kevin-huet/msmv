<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <router-view/>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>

import Navbar from '@/components/bars/Navbar'
import Footer from '@/components/bars/Footer'
export default {
  name: 'App',
  components: { Footer, Navbar },
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn }
  },
  methods: {
  },
  metaInfo: {
    title: 'Mont Saint Michel Voyages'
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err
      })
    })
  }
}
</script>
<style>
a.primary--text {
  color: #e5e9ec !important;
  caret-color: #f4f4f4 !important;
}
</style>
