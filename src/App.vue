<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import FileUpload from "@/components/FileUpload.vue";
</script>

<template>
  <header>
<!--    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />-->

    <div class="header">
      <h1>Fnirsi *.wav explorer</h1>
      <h2>For model FNIRSI1013D, FNIRSI1014D. </h2>
    </div>
  </header>

  <main>
<FileUpload></FileUpload>
<!--    <TheWelcome />-->
  </main>
</template>

<style scoped>

</style>

