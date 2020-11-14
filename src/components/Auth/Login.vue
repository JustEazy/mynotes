<template>
  <div>
    <v-form class="authform" @submit.prevent="submit">
      <v-text-field
        v-model="email"
        label="Почта"
        color="#F5F5F5"
        clearable
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Пароль"
        :type="showicon ? 'text' : 'password'"
        :append-icon="showicon ? 'fas fa-eye' : 'fas fa-eye'"
        color="#F5F5F5"
        @click:append="showicon = !showicon"
      ></v-text-field>
      <v-btn
        depressed
        type="submit"
        :loading="loading"
        @click="simulateProgress"
      >
        <span>Войти</span>
        <template v-slot:loading>
          <q-spinner-gears />
        </template>
      </v-btn>
      <router-link
        to="register"
        style="color: black; text-decoration-color: black; text-align: center"
        >Я не зарегистрирован. Перейти на страницу регистрации</router-link
      >
    </v-form>
    {{error}}
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      showicon: false,
      error: "",
      loading: false,
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.$router.replace({ name: "Home" });
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
    simulateProgress() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },
};
</script>
<style scoped>
div {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.v-text-field {
  font-size: 16pt;
}
.authform {
  padding: 30px;
}
.v-btn {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
}
.v-btn span {
  margin-right: 5px;
}
@media (max-width: 1025px) {
  .v-text-field {
    font-size: 13pt;
  }
}
</style>