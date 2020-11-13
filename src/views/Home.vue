<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app absolute temporary width="300px">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.data.displayName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <b>{{ rtClock }}</b>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{ user.data.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item link @click="showModal = true">
          <v-list-item-icon>
            <v-icon>fas fa-edit</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Добавить запись</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click.prevent="signOut">
          <v-list-item-icon>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Выйти из учетной записи</v-list-item-title>
          </v-list-item-content>
        </v-list-item> </v-list
      ><Modal v-model="showModal" title="Добавить запись">
        <v-form @submit.prevent="addNewNote">
          <v-text-field required
            label="Заголовок"
            name="title"
            v-model="addNewNoteData.title"
          ></v-text-field>
          <v-select :items="chooseCategory" label="Категория" v-model="addNewNoteData.category"></v-select>
          <v-textarea
            name="text"
            filled
            label="Текст"
            auto-grow
            clearable
            v-model="addNewNoteData.text"
          ></v-textarea>

          <v-btn class="ma-2" outlined color="black" block type="submit">
            Добавить запись
          </v-btn>
        </v-form>
      </Modal>
    </v-navigation-drawer>

    <v-app-bar
      app
      shrink-on-scroll
      src="https://picsum.photos/id/1082/1920/300"
      height="150"
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="white"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Записи</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="white"></v-tabs-slider>

          <v-tab v-for="category in categories" :key="category">
            {{ category }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <v-tabs-items v-model="tab">
        <v-tab-item class="note-tab"
          ><note-card
            v-for="(note, index) in notes"
            :key="index"
            :noteData="note"
            class="note-card"
        /></v-tab-item>
        <v-tab-item class="note-tab"
          ><note-card
            v-for="(note, index) in importantNotes"
            :key="index"
            :noteData="note"
            class="note-card"
        /></v-tab-item>
        <v-tab-item class="note-tab"
          ><note-card
            v-for="(note, index) in urgentNotes"
            :key="index"
            :noteData="note"
            class="note-card"
        /></v-tab-item>
        <v-tab-item class="note-tab"
          ><note-card
            v-for="(note, index) in laterNotes"
            :key="index"
            :noteData="note"
            class="note-card"
        /></v-tab-item>
      </v-tabs-items>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import NoteCard from "../components/Note/NoteCard.vue";
import moment from "moment";
import * as database from "../store/db";

export default {
  data: () => ({
    drawer: false,
    tab: null,
    categories: ["Все", "Важные", "Срочные", "На потом"],
    chooseCategory: [ "Важные", "Срочные", "На потом"],
    rtClock: moment().format("LTS"),
    showModal: false,
    addNewNoteData: {
      title: "",
      text: "",
      category: ""
    },
  }),
  components: { NoteCard },
  computed: {
    ...mapGetters({
      user: "user",
      notes: "notes",
      importantNotes: "importantNotes",
      laterNotes: "laterNotes",
      urgentNotes: "urgentNotes"
    }),
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("auth/login");
        });
    },
    addNewNote() {
      database
        .addNewNote(this.addNewNoteData.title, this.addNewNoteData.text, this.addNewNoteData.category)
        .catch((err) => {
          console.error("Error");
        });
    },
  },
  mounted: function () {
    setInterval(() => {
      this.rtClock = moment().format("LTS");
    }, 1000);
  },
};
</script>
<style>
.vm-btn-close,
.vm-btn-close:active,
.vm-btn-close:focus {
  outline: none !important;
}
.note-tab {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px;
}
.note-card {
  margin-bottom: 10px;
}

</style>