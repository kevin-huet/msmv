<template>
  <v-card>
    <v-tabs height="35px">
      <v-tab v-for="tabs in tabsData" :key="tabs.index" class="black--text">
        {{ tabs.title }}
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: 'Tabs',
  props: ['tabsData'],

  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>

<style lang="sass" scoped>
$tabs-icons-and-text-bar-height : 20px
</style>
