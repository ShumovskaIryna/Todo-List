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

<style lang="scss">

form {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  cursor: initial;
}
input:not([type="radio"]):not([type="checkbox"]) {
  width: 80%;
  height: 99%;
  padding: 5px 20px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  outline: none;
  background: white;
  cursor: initial;
}

button {
  min-width: 20%;
  height: 100%;
  padding: 5px 5px;
  border: none;
  outline: none;
  background: rgb(0, 0, 0);
  color: white;
  font-weight: 600;
  cursor: initial;
  margin-left: 5px;
}

</style>