<template>
<div>
  <v-card max-width="400">
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>{{ noteData.title }}</v-card-title>
      <v-card-subtitle class="pb-0 white--text">
        {{ noteData.date }}
      </v-card-subtitle>
    </v-img>

    <v-card-text class="text--primary">
      <div>{{noteData.text}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text> Изменить </v-btn>
      <v-btn color="orange" text> Удалить </v-btn>
    </v-card-actions>
  </v-card></div>
</template>

<script>

export default {
  name: "NoteCard",
  props: {
    noteData: Object,
  },
};
</script>

<style scoped>
</style>