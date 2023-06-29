<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="task">
        <label>
            <input type="checkbox" v-model="todo.isDone" />
        </label>
        <h3>{{ todo.title }}</h3>
        <div class="icons">
            <font-awesome-icon 
            @click="removeTodo(todo.id)" 
            icon="fa-solid fa-trash" 
            style="color: #ff0095;" 
            />
            <font-awesome-icon 
            v-if="!todo.isDone" 
            icon="fa-solid fa-pen" 
            style="color: #00bfff;" 
            />
        </div>
    </div>
</template>
  
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash, faPen)

export default {
    props: ['todo'],

}
</script>