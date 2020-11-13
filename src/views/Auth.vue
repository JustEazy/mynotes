<template>
  <div class="auth">
    <transition name="fade">
      <div class="form-container" v-if="show">
        <router-view name="auth" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.show = true;
  },
};
</script>
<style scoped>
.auth {
  background-image: url("../assets/authBg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-container {
  background: rgba(65, 63, 63, 0.5);
  width: 30%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
@media (max-width: 1025px) {
  .form-container {
    width: 70%;
  }
}
</style>
