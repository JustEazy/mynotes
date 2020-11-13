<template>
  <div>
    <v-card max-width="400px">
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://picsum.photos/400/300?random=2"
      >
        <div class="note-title">
          <v-card-title>{{ noteData.title }}</v-card-title>
          <v-card-subtitle class="pb-0 white--text">
            {{ noteData.date }}
          </v-card-subtitle>
        </div>
      </v-img>

      <v-card-text class="text--primary">
        <div>{{ noteData.text }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="black"
          class="white--text"
          width="49%"
          @click="showModal = true"
        >
          Изменить
        </v-btn>
        <v-btn color="red" class="white--text" width="49%" @click="deleteNote">
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>
    <Modal v-model="showModal" title="Изменить запись">
      <v-form @submit.prevent="editNote">
        <v-text-field
          label="Заголовок"
          name="title"
          clearable
          :value="noteData.title"
          v-model="noteData.title"
        ></v-text-field>
        <v-select
          :items="categories"
          label="Категория"
          v-model="noteData.category"
          :value="noteData.category"
        ></v-select>
        <v-textarea
          name="text"
          filled
          label="Текст"
          auto-grow
          clearable
          :value="noteData.text"
          v-model="noteData.text"
        ></v-textarea>

        <v-btn class="ma-2" outlined color="black" block type="submit">
          Изменить запись
        </v-btn>
      </v-form>
    </Modal>
  </div>
</template>

<script>
import * as database from "../../store/db";
export default {
  name: "NoteCard",
  data() {
    return {
      showModal: false,
      categories: ["Важные", "Срочные", "На потом"],
    };
  },
  props: {
    noteData: Object,
  },
  methods: {
    deleteNote() {
      database.deleteNote(this.noteData.id).catch((err) => {
        console.error("Error");
      });
    },
    editNote() {
      database
        .editNote(
          this.noteData.title,
          this.noteData.category,
          this.noteData.text,
          this.noteData.noteId
        )
        .catch((err) => {
          console.error("Error");
        });
    },
  },
};
</script>

<style scoped>
.note-title {
  background-color: rgba(0, 0, 0, 0.5);
}
.v-card__text {
  height: 150px;
}
@media (max-width: 400px) {
  .v-card {
    width: 300px;
}}
</style>