<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="task">
        <label>
            <input type="checkbox" @click="todoStore.doTask(todo.id)" v-model="todo.isDone" />
        </label>
        <div class="update-mood" v-if="isInputAllowed">
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

        <div class="general-mood" v-else>
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
import { useToast } from 'vue-toastification'
import { isTodoValid } from '@/utils/utils'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash, faPen)

export default {
    props: ['todo'],
    setup() {
        const todoStore = useTodoStore()
        const toast = useToast()

        return { todoStore, toast }
    },
    data() {
        return {
            inputValue: this.todo.title,
            isInputAllowed: false, // Set the initial disabled state based on your condition
        };
    },

    methods: {
        isDisabled() {
            this.isInputAllowed = !this.isInputAllowed;
            return this.isInputAllowed;
        },

        updateData(todoId) {
            if (!isTodoValid(this.inputValue)) {
                this.toast.error('Please provide correct text');

                return;
            }
            this.isInputAllowed = !this.isInputAllowed;
            this.todoStore.updateTask(todoId, this.inputValue);
        }
    }
}
</script>

<style lang="scss">
%flex_row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.task {
    height: auto;
    width: 100%;
    margin: 5px auto;
    padding: 5px 20px;
    background-color: rgb(255, 255, 255);
    @extend %flex_row;
    .update-mood{
        flex: 12;
        justify-content: space-between;
        @extend %flex_row;
    }
    .general-mood{
        flex: 12;
        @extend %flex_row;
    }
    label {
        flex: 1;
    }
}
h4 {
  font-weight: 600;
  text-align: center;
  color: black;
}
.icons {
    @extend %flex_row;
    margin-top: 8px;
}
</style>