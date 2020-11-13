<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import * as database from './store/db'
export default {
  mounted(){
    database.initializeDataBase();
  }
};
</script>

<style>
</style>
