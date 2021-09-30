<template>
  <v-col :cols="(size) ? size : 4">
    <v-card class="mx-auto">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-1">
            {{ title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ description }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon tile>
          <v-icon size="50" color="grey">{{ icon }}</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-card-actions>
        <router-link :to="link" class="link">
        <v-btn color="success">
          Accèder
        </v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ['title', 'description', 'link', 'size', 'icon'],
  name: 'BackofficeCategory'
}
</script>

<style scoped>
.link {
  text-decoration: none;
}
</style>
