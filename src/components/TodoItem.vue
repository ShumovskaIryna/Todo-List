<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="task">
        <label>
            <input type="checkbox" @click="todoStore.doTask(todo.id)" v-model="todo.isDone" />
        </label>
        <div v-if="isInputAllowed">
            <input 
                type="text" 
                v-model="inputValue"
            >
                <button
                    @click="updateData(todo.id, inputValue)"
                >
                Update
            </button>
        </div>

        <div v-else>
            <input type="text" v-model="todo.title" disabled>
            <div class="icons">
                <font-awesome-icon 
                @click="todoStore.removeTask(todo.id)" 
                icon="fa-solid fa-trash" 
                style="color: #ff0095;" 
                />
                <font-awesome-icon
                @click="isDisabled(todo)" 
                v-if="!todo.isDone" 
                icon="fa-solid fa-pen" 
                style="color: #00bfff;
                margin-left: 10px;" 
                />
            </div>
        </div>

    </div>
</template>
  
<script>
import { useTodoStore } from '@/stores/todoStore'
// import { ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash, faPen)

export default {
    props: ['todo'],
    setup() {
        const todoStore = useTodoStore()

        // const inputValue = ref('')

        // const handleSubmit = () => {
        // if (inputValue.value.length > 0) {
        //     todoStore.addTask({
        //     id: todoStore.tasks?.length + 1,
        //     title: inputValue.value,
        //     isDone: false})
        //     inputValue.value = ""
        // }
        // }

        return { todoStore, 
            // handleSubmit, 
            // inputValue 
        }
    },
    data() {
        return {
            inputValue: this.todo.title,
            isInputAllowed: false, // Set the initial disabled state based on your condition
        };
    },

    methods: {
        isDisabled(todo) {
            this.isInputAllowed = !this.isInputAllowed;
            console.log(todo?.id, 333, this.isInputAllowed);
            return this.isInputAllowed;
        },

        updateData(todoId) {
            if (!this.inputValue.length) {
                console.error('empty');
            }
            this.isInputAllowed = !this.isInputAllowed;
            this.todoStore.updateTask(todoId, this.inputValue);
        }
    }
}
</script>

<style lang="scss">

.task {
    display: flex;
    height: auto;
    width: 100%;
    margin: 5px auto;
    padding: 5px 20px;
    background-color: rgb(255, 255, 255);
    flex-direction: row;
    justify-content: space-between;
    div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    }
}

h4 {
  font-weight: 600;
  text-align: center;
  color: black;
}
.icons {
display: flex;
justify-content: space-between;
margin-top: 8px;
}

</style>