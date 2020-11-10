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
      <v-btn depressed type="submit">
        <span>Войти</span><v-icon>fas fa-sign-in-alt</v-icon>
      </v-btn>
      <router-link
        to="register"
        style="color: black; text-decoration-color: black; text-align: center"
        >Я не зарегистрирован. Перейти на страницу регистрации</router-link
      >{{error}}
    </v-form>
    
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      showicon: false,
      error:''
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>
<style scoped>
.v-text-field {
  font-size: 16pt;
}
.authform {
  padding: 30px;
}
.v-btn {
  width: 100%;
  margin-bottom: 10px;
}
.v-btn span {
  margin-right: 5px;
}
.v-btn .v-icon {
  margin-bottom: 2px;
}
</style>