<template>
  <div class="home">
    <h1>HOME</h1>
    <div class="task-input">
      <input>
    </div>
    <div class="button">
      <button>Add new task</button>
    </div>
    <hr>
    <div class="list" id="todo-list">

    <div v-for="todo in todoStore.tasks" :class="`todo-list`" v-bind:key="todo.id">
      <label>
        <input type="checkbox" v-model="todo.isDone" />
      </label>
      <div class="todo-content">
        <input type="text" v-model="todo.title" />
      </div>

      <div class="actions">
        <button class="delete" @click="removeTodo(todo)">Delete</button>
      </div>
    </div>

    </div>
  </div>
</template>

<script setup>
// import { ref, computed } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()
const removeTodo = (todo) => {
	todoStore.value = todoStore.value.filter((t) => t !== todo)
}
// const count = ref(0)

</script>

<style>
  .task-input{
    font-size: 60px;
    margin: 20px;
  }
  .button button{
    font-size: 20px;
    margin: 10px;
  }

  :root {
	--light: #EEE;
	--grey: #888;
	--dark: #313154;

	--shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'montserrat', sans-serif;
}

input:not([type="radio"]):not([type="checkbox"]), button {
	appearance: none;
	border: none;
	outline: none;
	background: none;
	cursor: initial;
}

body {
	background: var(--light);
	color: var(--dark);
}
</style>
