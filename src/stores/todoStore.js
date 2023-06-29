import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todoList', {
    state: () => ({
      tasks: [
        {id: 1, title: "buy some fruit", isDone: false },
        {id: 2, title: "buy some milk", isDone: true }
      ]
    })
  },
)
