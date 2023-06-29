<template>
  <div class="home">
    <div class="task-input">
      <TodoForm />
    </div>

    <nav class="filter">
      <button @click="filter = 'isNotDone'">ToDo List</button>
      <button @click="filter = 'isDone'">Is Done</button>
    </nav>

    <div v-if="filter === 'isNotDone'" class="list" id="todo-list">
      ToDo List {{todoStore.notDoneCount}}
      <div v-for="todo in todoStore.taskIsNotDone" v-bind:key="todo.id">
        <TodoItem :todo="todo" />
      </div>
    </div>

    <div v-if="filter === 'isDone'" class="list" id="todo-list">
      is Done {{todoStore.doneCount}}
      <div v-for="todo in todoStore.taskIsDone" v-bind:key="todo.id">
        <TodoItem :todo="todo" />
      </div>
    </div>

  </div>
</template>

<script>
import { useTodoStore } from '@/stores/todoStore'
import TodoItem from '../components/TodoItem.vue'
import TodoForm from '../components/TodoForm.vue'
import { ref } from 'vue'

export default {
  components: { TodoItem, TodoForm},
  setup() {
	const todoStore = useTodoStore()
  const filter = ref('isNotDone')
	return { todoStore, filter }
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
