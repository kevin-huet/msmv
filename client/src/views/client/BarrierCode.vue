<template>
  <v-container>
    <v-card class="pa-4" color="grey lighten-4">
      <v-row dense>

        <v-stepper v-model="e1" width="100%">
          <v-stepper-header>
            <v-stepper-step color="success" :complete="e1 > 1" step="1"  :rules="[() => !alert]">Vos informations</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step color="success" :complete="e1 > 2" step="2">Choisissez un motif</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step color="success" step="3">Envoi du code barrière</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="mb-12" flat>
                <v-row>
                  <v-col cols="12">
                    <Alert icon="mdi-alert-circle" color="red" :alert="alert" border="left" :text="notAvailable"></Alert>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field :disabled="this.alert" v-model="email" label="Email" required/>
                  </v-col>
                  <v-col cols="8"></v-col>
                  <v-col  cols="4">
                    <v-text-field :disabled="this.alert" v-model="lastname" label="Nom"/>
                  </v-col >
                  <v-col cols="8"></v-col>
                  <v-col  cols="4">
                    <v-text-field :disabled="this.alert" v-model="firstname" label="Prenom"/>
                  </v-col>
                  <v-col  cols="12">
                    <v-checkbox :disabled="this.alert" color="green" v-model="terms" label="J'accepte les conditions générales de vente et la politique de confidentialité.*" required/>
                  </v-col>
                </v-row>
              </v-card>

              <v-btn color="success" :disabled="this.alert" @click="toStep2">Continuer</v-btn>

            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="mb-12" flat height="120px">
                <v-row>
                  <v-col cols="8" lg="3" md="4">
                    <v-select class="mt-8" :items="items" v-model="reason" label="Motif" dense />
                  </v-col>
                </v-row>
              </v-card>
              <v-btn color="success" @click="toStep3">Continuer</v-btn>
              <v-btn text @click="e1 = 1">Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="mb-12" flat>
                <v-card-subtitle><b>Vos informations</b></v-card-subtitle>

                <v-row class="ml-1">
                  <v-col cols="5">
                    <v-text-field disabled v-model="email" label="Email" required/>
                    <v-text-field disabled v-model="lastname" label="Nom" required/>
                    <v-text-field disabled v-model="firstname" label="Prenom" required/>
                    <v-text-field disabled v-if="reason" disable v-model="reason" label="Motif" required/>
                  </v-col>
                </v-row>
                <v-card-text><a @click="e1 = 1">Modifier mes informations</a></v-card-text>
              </v-card>
              <v-btn color="success" @click="submitCodeRequest">Générer un code barrière</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Alert from '@/components/Alert'
export default {
  name: 'BarrierCode',
  components: { Alert },
  data () {
    return {
      notAvailable: 'Code barrière en rupture de stock. Contactez nous ou réessayez ultérieurement',
      alert: false,
      email: '',
      customer: null,
      reason: '',
      firstname: '',
      lastname: '',
      terms: false,
      e1: 1,
      items: [
        'Nouvelle visite',
        'Code érroné',
        'Code supplémentaire (2 voitures et +)',
        'Oublie du code'
      ]
    }
  },
  methods: {
    toStep2 () {
      this.$http(process.env.VUE_APP_BASE_API_URL + 'code/barrier/client?email=' + this.email).then(r => {
        this.customer = r.data.customer
        console.log(this.customer)

        if (!this.customer) {
          this.toStep3()
        } else {

        }
      }).catch(err => {
        console.log(err)
      })
      this.e1 = 2
    },
    toStep3 () {
      this.e1 = 3
      console.log(this.reason)
    },
    submitCodeRequest () {
      this.$http.post(process.env.VUE_APP_BASE_API_URL + 'code/barrier/use-barrier-code', {
        email: this.email,
        lastname: this.lastname,
        firstname: this.firstname,
        reason: this.reason
      })
    }
  },
  mounted () {
    this.$http.get(process.env.VUE_APP_BASE_API_URL + 'code/barrier/available').then(() => {
      this.alert = true
    }).catch(() => {
      this.alert = true
    })
  }
}
</script>

<style scoped>

</style>
