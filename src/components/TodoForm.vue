<template>
  <form @submit.prevent="handleSubmit">
    <input 
      type="text" 
      placeholder="I need to..."
      v-model="newTodoItem"
    >
    <button>Add</button>
  </form>
</template>
  
<script>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'

export default {
  setup() {
    const todoStore = useTodoStore()

    const newTodoItem = ref('')

    const handleSubmit = () => {
      if (newTodoItem.value.length > 0) {
          todoStore.addTask({
          id: todoStore.tasks?.length + 1,
          title: newTodoItem.value,
          isDone: false})
        newTodoItem.value = ""
      }
    }

    return { handleSubmit, newTodoItem }
  }
}
</script>