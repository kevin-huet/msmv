<template>
  <v-container>
    <v-app-bar>
      <v-app-bar-nav-icon class="d-flex d-sm-none" @click="drawer = true"></v-app-bar-nav-icon>
      <v-avatar style="width: 120px" :tile="true">
        <img src="@/assets/msmv_logo.webp" alt="logo" height="64px" width="100%">
      </v-avatar>
      <v-spacer></v-spacer>
      <v-menu
        v-if="isLoggedIn"
        bottom
        left
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.link"
            @click="menuActionClick(item.action)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: 'Navbar',
  mounted () {
  },
  methods: {
    menuActionClick: function (action) {
      if (action === 'logout') {
        this.logout()
      }
    },
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('login')
        })
    }
  },
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { title: 'Click Me', link: '', action: 'profile', method: '' },
      { title: 'Deconnexion', link: '', action: 'logout', method: '' }
    ]
  }),
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn }
  }
}
</script>

<style scoped>

</style>
