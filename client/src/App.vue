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
import axios from 'axios'
export default {
  name: 'App',
  components: { Footer, Navbar },
  mounted () {
    axios.get(this.url).then((response) => {
      this.user = response.data.user
      console.log(this.user)
    })
  },
  data () {
    return {
      user: null
    }
  }
}
</script>
