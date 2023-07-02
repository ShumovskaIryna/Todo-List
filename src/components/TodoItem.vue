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
$form-control-color: rgb(0, 148, 0);
%flex_row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
%none {
    appearance: none;
    border: none;
    outline: none;
    cursor: initial;
}
.task {
    height: auto;
    width: 100%;
    margin: 5px auto;
    padding: 5px 10px;
    background-color: rgb(255, 255, 255);
    @extend %flex_row;
    .update-mood{
        flex: 15;
        justify-content: space-between;
        @extend %flex_row;
    }
    .general-mood{
        flex: 15;
        @extend %flex_row;
    }
    label {
        flex: 1;
    }
}
@media only screen and (max-width: 1400px) {
    input[type="text"], input[type="text"]:disabled{
    font-weight: 600;
    color: black;
    width: 100%;
    font-size: 18px;
    }
}
@media only screen and (max-width: 500px) {
    input[type="text"], input[type="text"]:disabled{
    font-weight: 500;
    font-size: 15px;
    }
}

.icons {
    @extend %flex_row;
    margin-top: 8px;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}
.form-control {
  font-family: system-ui, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.1;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
}
.form-control + .form-control {
  margin-top: 1em;
}
input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  font: inherit;
  color: black;
  width: 1.15em;
  height: 1.15em;
  border: 0.1em solid black;
  border-radius: 0.15em;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  margin-top: 5px;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
  transform-origin: bottom left;
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em $form-control-color;
}

input[type="checkbox"]:checked::before {
    margin-left: -5px;
    margin-bottom: -5px;
    transform: scale(2);
}
</style>