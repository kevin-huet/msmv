<template>
  <v-dialog
    :value="dialogState"
    @click:outside="close()"
    transition="dialog-top-transition"
    scrollable
    max-width="70vw"
  >
    <template v-slot:activator="{ }">
      <v-btn :disabled="disabled" color="success" @click="dialogState = true">
        {{ btnTitle }}
      </v-btn>
    </template>
      <v-card>
        <v-toolbar>{{ btnTitle }}</v-toolbar>
        <v-card-text>
          <slot/>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialogState = false">Close</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Modal',
  props: ['btnTitle', 'componentName', 'disabled', 'dialog'],

  data () {
    return {
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
  }
}
</script>

<style scoped>

</style>
