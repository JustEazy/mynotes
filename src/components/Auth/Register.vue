<template>
  <div>
    <v-form class="authform" @submit.prevent="submit">
      <v-text-field
        v-model="name"
        label="Имя*"
        :rules="nameRules"
        color="#F5F5F5"
        clearable
      ></v-text-field>
      <v-text-field
        v-model="email"
        type="email"
        label="Почта*"
        :rules="emailRules"
        color="#F5F5F5"
        clearable
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Пароль*"
        :rules="passwordRules"
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
        <span>Регистрация</span>
        <template v-slot:loading>
          <q-spinner-gears />
        </template>
      </v-btn>
      <router-link
        to="login"
        style="color: black; text-decoration-color: black; text-align: center"
        >Я зарегистрирован. Перейти на страницу авторизации</router-link
      >
    </v-form>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      name: "",
      password: "",
      nameRules: [(value) => !!value || "Обязательно для заполнения"],
      showicon: false,
      emailRules: [
        (value) => !!value || "Обязательно для заполнения",
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Неверный формат";
        },
      ],
      passwordRules: [
        (value) => (value || "").length > 6 || "Минимум 6 символов",
        (value) => !!value || "Обязательно для заполнения",
      ],
      loading: false,
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: this.name,
              email: this.email,
            })
            .then(() => {
              firebase
                .auth()
                .currentUser.sendEmailVerification()
                .then(function () {
                  console.log("registered");
                })
                .catch(function (error) {
                  console.log("error");
                });
            })
            .then(() => {
              this.$router.replace("/verify");
            });
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