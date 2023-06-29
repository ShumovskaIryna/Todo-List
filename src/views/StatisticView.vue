<template>
  <div class="statistic">

    <div class="list" id="todo-list">
      You have to do {{todoStore.taskIsNotDone.length}} tasks
    </div>

    <div class="list" id="todo-list">
      You have already done {{todoStore.taskIsDone.length}} tasks
    </div>

  </div>
</template>

<script>
import { useTodoStore } from '@/stores/todoStore'

export default {
  setup() {
	const todoStore = useTodoStore()
	return { todoStore }
  }
}

</script>
