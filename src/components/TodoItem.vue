<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="task">
        <label>
            <input type="checkbox" @click="todoStore.doTask(todo.id)" v-model="todo.isDone" />
        </label>
        <h4>{{ todo.title }}</h4>
        <div class="icons">
            <font-awesome-icon 
            @click="todoStore.removeTask(todo.id)" 
            icon="fa-solid fa-trash" 
            style="color: #ff0095;" 
            />
            <font-awesome-icon 
            v-if="!todo.isDone" 
            icon="fa-solid fa-pen" 
            style="color: #00bfff; margin-left: 10px;" 
            />
        </div>
    </div>
</template>
  
<script>
import { useTodoStore } from '@/stores/todoStore'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash, faPen)

export default {
    props: ['todo'],
    setup() {
    const todoStore = useTodoStore()

    return { todoStore }
    }
}
</script>

<style lang="scss">

.task {
    display: flex;
    height: auto;
    width: 90%;
    margin: 5px auto;
    padding: 5px 30px;
    background-color: rgb(255, 255, 255);
    flex-direction: row;
    justify-content: space-between;
}

h4 {
  font-weight: 600;
  text-align: center;
  color: black;
}
.icons {
display: flex;
justify-content: space-around;
}

</style>