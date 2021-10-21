<template>
  <form class="login" @submit.prevent="submit">
    <v-text-field
      v-model="child"
      label="Enfant"
      type="number"
      required
    ></v-text-field>
    <v-text-field
      v-model="young"
      label="Jeune"
      type="number"
      required
    ></v-text-field>
    <v-text-field
      v-model="adult"
      label="Adulte"
      type="number"
      required
    ></v-text-field>
    <v-btn color="success" type="submit">submit</v-btn>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditPriceForm',
  props: ['planPrices'],
  data () {
    return {
      category: 'standard',
      adult: 0,
      child: 0,
      young: 0
    }
  },
  computed: {
    dialogState: {
      get () {
        return this.dialog
      },
      set (val) {
        this.$emit('close', val)
      }
    }
  },
  methods: {
    submit: function () {
      axios.post(process.env.VUE_APP_BASE_API_URL + 'booking/prices/standard/set', {
        child: this.child,
        young: this.young,
        adult: this.adult
      }).then(r => {
        this.dialogState = false
      }).catch()
    }
  },
  mounted () {
    this.adult = (this.planPrices.adult) ? this.planPrices.adult.price : 0
    this.young = (this.planPrices.young) ? this.planPrices.young.price : 0
    this.child = (this.planPrices.child) ? this.planPrices.child.price : 0
  }
}
</script>

<style scoped>

</style>
