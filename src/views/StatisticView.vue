<template>
  <div class="statistic">
    <div class="list" id="todo-list">
      <h3>You have to do <span class="num">{{todoStore.taskIsNotDone.length}}</span> tasks</h3>
    </div>
    <div class="list" id="todo-list">
      <h3>You have already done <span class="num">{{todoStore.taskIsDone.length}}</span> tasks</h3>
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

<style lang="scss">

.statistic { 
  width: 100%;
  margin: 50px auto;
}
.list {
  height: auto;
  width: 80%;
  margin: 20px auto;
  justify-content: center;
  align-items: center;
}
.num {
  color: aqua;
  font-weight: 800;
  font-size: larger;
}
</style>
