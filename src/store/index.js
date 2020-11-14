import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    notes: null,
    importantNotes: null,
    laterNotes: null,
    urgentNotes: null,
  },
  plugins: [createPersistedState()],
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_ALL_NOTES(state, data) {
      state.notes = data
    },
    SET_IMPORTANT_NOTES(state, data) {
      state.importantNotes = data
    },
    SET_LATER_NOTES(state, data) {
      state.laterNotes = data
    },
    SET_URGENT_NOTES(state, data) {
      state.urgentNotes = data
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    },
    async getAllNotes({ commit }, data) {
      commit('SET_ALL_NOTES', await data)
    },
    async getImportantNotes({ commit }, data) {
      commit('SET_IMPORTANT_NOTES', await data)
    },
    async getLaterNotes({ commit }, data) {
      commit('SET_LATER_NOTES', await data)
    },
    async getUrgentNotes({ commit }, data) {
      commit('SET_URGENT_NOTES', await data)
    },
  },
  getters: {
    user(state) {
      return state.user
    },
    notes(state) {
      return state.notes
    },
    importantNotes(state){
      return state.importantNotes
    },
    laterNotes(state){
      return state.laterNotes
    },
    urgentNotes(state){
      return state.urgentNotes
    },

  },
})
