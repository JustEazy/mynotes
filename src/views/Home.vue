<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app absolute temporary width="300px">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.data.displayName }}
          </v-list-item-title>
           <v-list-item-subtitle>
           <b>{{rtClock}}</b>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{ user.data.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item link>
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
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      shrink-on-scroll
      src="https://picsum.photos/id/1/1920/300"
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

          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <v-tabs-items v-model="tab">
        <v-tab-item class="note-tab"><note-card v-for="(note, index) in notes" :key="index" :noteData="note" class="note-card"/></v-tab-item>
      </v-tabs-items>
    </v-main>
  </v-app>
</template>

<script>

import { mapGetters } from "vuex";
import firebase from "firebase";
import NoteCard from '../components/Note/NoteCard.vue';
import moment from 'moment';

export default {
  data: () => ({
    drawer: false,
    tab: null,
    items: ["web", "shopping", "videos", "images", "news"],
    rtClock: moment().format('LTS')
  }),
  components: {NoteCard,},
  computed: {
    ...mapGetters({
      user: "user",
      notes: "notes"
    }),
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('auth/login')
        });
    },
  },
  mounted: function() {
		setInterval(()=>{
			this.rtClock = moment().format('LTS')
		},1000)
	}
};
</script>
<style scoped>

.note-tab{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px;
}
.note-card{
  margin-bottom: 10px;
}
</style>