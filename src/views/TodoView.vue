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
		<div v-for="todo in todoStore.tasks" v-bind:key="todo.id">
			<TodoList :todo="todo" />
		</div>
    </div>
  </div>
</template>

<script>
import { useTodoStore } from '@/stores/todoStore'
import TodoList from '../components/TodoList.vue'

export default {
  components: { TodoList},
  setup() {
	const todoStore = useTodoStore()

	return { todoStore }
  }
}

</script>

<style lang="scss">
  .task-input{
    font-size: 60px;
    margin: 20px;
  }
  .button button{
    font-size: 20px;
    margin: 10px;
  }

	$light: #EEE;
	$grey: #888;
	$dark: #313154;
	$shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

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
	background: white;
	cursor: initial;
}

body {
	background: $light;
	color: $dark;
}
</style>
