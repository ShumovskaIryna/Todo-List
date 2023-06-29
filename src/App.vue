<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <nav>
      <RouterLink to="/">Todo List</RouterLink> | 
      <RouterLink to="/statistic">Statistic</RouterLink>
    </nav>
  <RouterView />
</div>

</template>

<style>
  .app{
    text-align: center;
  }
</style>