<template>
  <div>
    <v-alert width="50%">Вы успешно прошли процесс регистрации! Вам на почту было отправлено письмо с ссылкой на подтверждение регистрации. Для дальнейшей работы в приложение вам необходимо перейти по ссылке, указанной в письме. </v-alert>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.v-alert{
    text-align: center;
    font-size: 20pt;
    margin: 20% auto;
}
</style>