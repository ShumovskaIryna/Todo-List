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
      <h3>Loading tasks...</h3>
    </div>
    
    <div v-if="filter === 'isNotDone'" class="list" id="todo-list">
      <h3>ToDo List</h3>
      <div v-for="todo in paginatedTaskIsNotDone" v-bind:key="todo.id">
        <TodoItem :todo="todo" />
      </div>
      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <button class="current"> {{ currentPage }} </button>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>

    <div v-if="filter === 'isDone'" class="list" id="todo-list">
      <h3>is Done</h3>
      <div v-for="todo in paginatedTaskIsDone" v-bind:key="todo.id">
        <TodoItem :todo="todo" />
      </div>
      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <button class="current"> {{ currentPage }} </button>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useTodoStore } from '@/stores/todoStore'
import TodoItem from '@/components/TodoItem.vue'
import TodoForm from '@/components/TodoForm.vue'

import { ref, computed } from 'vue'

/**
 * TodoView component
 */
export default {
  components: { 
    TodoItem, 
    TodoForm,
  },

  setup() {
    const todoStore = useTodoStore()
    const filter = ref('isNotDone')
    const currentPage = ref(1)
    const pageSize = 8

    /**
     * Get tasks from the store
     */
    todoStore.getTasks();

    /**
     * Computed property for paginated task list of 'isNotDone' filter
     */
    const paginatedTaskIsNotDone = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize
      const endIndex = startIndex + pageSize
      return todoStore.taskIsNotDone.slice(startIndex, endIndex)
    })

    /**
     * Computed property for paginated task list of 'isDone' filter
     */
    const paginatedTaskIsDone = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize
      const endIndex = startIndex + pageSize
      return todoStore.taskIsDone.slice(startIndex, endIndex)
    })

    /**
     * Computed property for total number of pages based on the current filter
     */
    const totalPages = computed(() => {
      return Math.ceil(filter.value === 'isNotDone' ? todoStore.taskIsNotDone.length / pageSize : todoStore.taskIsDone.length / pageSize)
    })

    /**
     * Go to the previous page of the paginated list
     */
    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    /**
     * Go to the next page of the paginated list
     */
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    return { 
      todoStore, 
      filter, 
      currentPage, 
      pageSize, 
      paginatedTaskIsNotDone, 
      paginatedTaskIsDone, 
      totalPages, 
      previousPage, 
      nextPage,
    }
  },
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
h3 {
  font-weight: 600;
  text-align: center;
  color: white;
}
.list {
  height: auto;
  width: 90%;
  margin: 10px auto;
  justify-content: center;
  align-items: center;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.pagination button {
  margin: 0 5px;
}
.current {
  background-color: rgb(186, 185, 185);
  font-weight: 600;
  color: black;
}
</style>
