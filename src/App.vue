<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <nav class="navigation">
      <RouterLink to="/">Todo List</RouterLink>
      <RouterLink to="/statistic">Statistic</RouterLink>
    </nav>
    <div class="wrapper">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
$light: #EEE;
$grey: #888;
$dark: #313154;
$gradient: linear-gradient(180deg, #57fffc, #eeff6a);
$shadow: 0 5px 15px rgb(0, 0, 0);

%flex_space {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'montserrat', sans-serif;
}
body {
	background: $gradient;
	color: $light;
}
.app {
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
  box-shadow: $shadow;
}
.navigation {
  margin: 0;
  width: 100%;
  height: 70px;
  line-height: 70px;
  background-color: #000000;
  @extend %flex_space;
}
a {
  font-size: 18px;
  font-weight: 700;
  min-width: 140px;
  @extend %flex_space;
}
a:hover {
  font-size: 22px;
  font-weight: 800;
}
.wrapper {
  margin: 0;
  min-height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  @extend %flex_space;
}
</style>