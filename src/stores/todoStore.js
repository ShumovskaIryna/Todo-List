import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todoList', {
    state: () => ({
      tasks: [],
      loading: false
    }),
    getters: {
      taskIsDone(){
        return this.tasks.filter(t => t.isDone)
      },
      taskIsNotDone(){
        return this.tasks.filter(t => !t.isDone)
      },
    },
    actions: {
      async getTasks() {
        this.loading = true
        const res = await fetch('http://localhost:3000/tasks')
        const data = await res.json()
  
        this.tasks = data
        this.loading = false
      },
      async addTask(task) {
        this.tasks.push(task)
  
        const res = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          body: JSON.stringify(task),
          headers: {'Content-Type': 'application/json'}
        })
  
        if (res.error) {
          console.log(res.error)
        }
      },
      async removeTask(id) {
        this.tasks = this.tasks.filter(t => {
          return t.id !== id
        })
  
        const res = await fetch('http://localhost:3000/tasks/' + id, {
          method: 'DELETE',
        })
  
        if (res.error) {
          console.log(res.error)
        }
      },
      async doTask(id) {
        const task = this.tasks.find(t => t.id === id)
        task.isDone = !task.isDone
  
        const res = await fetch('http://localhost:3000/tasks/' + id, {
          method: 'PATCH',
          body: JSON.stringify({ isDone: task.isDone }),
          headers: {'Content-Type': 'application/json'}
        })
  
        if (res.error) {
          console.log(res.error)
        }
      }
    }
  },
)
