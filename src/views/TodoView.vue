<template>
  <div class="home">
    <div class="task-input">
      <TodoForm />
    </div>

    <nav class="filter">
      <button @click="filter = 'isNotDone'">ToDo List</button>
      <button @click="filter = 'isDone'">Is Done</button>
    </nav>

    <div v-if="todoStore.loading" class="loading">
      Loading tasks...
    </div>
    
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
  todoStore.getTasks()
  const filter = ref('isNotDone')
	return { todoStore, filter }
  }
}

</script>

<style lang="scss">
.home { 
  width: 100%;
}

.task-input {
  height: 50px;
  width: 90%;
  margin: 30px auto;
}

.filter {
  display: flex;
  height: 30px;
  width: 90%;
  margin: 30px auto;
  justify-content: end;
  align-items: center;
}
.filter button {
  display: flex;
  min-width: 80px;
  align-items: center;
  justify-content: space-around;
}
.list {
  height: auto;
  width: 90%;
  margin: 10px auto;
  justify-content: center;
  align-items: center;
}
</style>
