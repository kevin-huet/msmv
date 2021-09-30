<template>
  <v-dialog
    transition="dialog-top-transition"
    scrollable
    max-width="70vw"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">
        {{ btnTitle }}
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Opening from the top</v-toolbar>
        <v-card-text>
          <slot/>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: 'Modal',
  props: ['btnTitle', 'componentName']
}
</script>

<style scoped>

</style>
