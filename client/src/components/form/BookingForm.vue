<template>
  <form @submit.prevent="submit">
    <v-row>
      <v-col col="6" sm="6" lg="4">
        <v-text-field v-model="firstname" :error-messages="nameErrors" label="Nom" required/>
      </v-col>
      <v-col col="6" sm="6" lg="4">
        <v-text-field v-model="lastname" :error-messages="nameErrors" :counter="10" label="Prenom" required/>
      </v-col>
      <v-col cols="0" lg="4"></v-col>
      <v-col cols="12" sm="7" lg="4">
        <v-text-field v-model="email" :error-messages="emailErrors"
          label="E-mail" required
        />
      </v-col>
      <v-col cols="12" sm="5" lg="4">
        <v-text-field v-model="phone" :error-messages="nameErrors" label="Telephone" required
        />
      </v-col>
      <v-col cols="12" sm="6" lg="8">

        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Date de visite"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(date)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>

      </v-col>
      <v-col cols="7" sm="7" lg="6">
        <v-card>
          <v-card-title>Forfaits</v-card-title>
          <v-card-text>
          <v-row>
        <v-col sm="4">
          <v-text-field label="enfant" v-model="child" type="number"/>
        </v-col>
        <v-col sm="4">
          <v-text-field label="jeune" v-model="young" type="number"/>
        </v-col>
        <v-col sm="4">
          <v-text-field label="adulte" v-model="adult" type="number"/>
        </v-col>
          </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col sm="8" cols="12" lg="7">
        <v-text-field v-model="comment" label="Commentaire" required type="text"
        />
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>Résumé de la commande</v-card-title>
          <v-card-text>
            <v-row>
              <v-col sm="4">
                {{ price }} €
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-btn class="mr-4" @click="submit">submit</v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'BookingForm',
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },

  data () {
    return {
      planPrices: {},
      price: 0,
      menu: false,
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      young: 0,
      adult: 0,
      child: 0,
      comment: '',
      date: '',
      vTextComponent: ''
    }
  },

  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  },

  watch: {
    child (val) {
      console.log(this.planPrices.child.price)
      this.price = (this.planPrices.child.price * this.child) + (this.planPrices.adult.price * this.adult) + (this.planPrices.young.price * this.young)
    },
    young (val) {
      this.price = (this.planPrices.child.price * this.child) + (this.planPrices.adult.price * this.adult) + (this.planPrices.young.price * this.young)
    },
    adult (val) {
      this.price = (this.planPrices.child.price * this.child) + (this.planPrices.adult.price * this.adult) + (this.planPrices.young.price * this.young)
    }
  },
  mounted () {
    this.$http.get('http://localhost:3000/booking/prices/standard')
      .then((res) => {
        this.planPrices = res.data.prices
        console.log(this.prices)
      })
      .catch(err => console.log(err))
  },
  methods: {
    submit () {
      this.$http.post(process.env.VUE_APP_BASE_API_URL + 'booking/add', {
        firstname: this.firstname,
        lastname: this.lastname,
        phone: this.phone,
        email: this.email,
        comment: this.comment,
        visitDate: this.date,
        plans: {
          standard: {
            child: this.child,
            young: this.young,
            adult: this.adult
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
