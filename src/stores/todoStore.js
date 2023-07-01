import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';

/**
 * json-server does not return created entity. But we still need id in store.
 * It is a hack 🙂
 * @param {object} task 
 */
function formTaskWithId(task) {
  return {
    ...task,
    id: uuidv4(),
  }
}

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
        const newTaskWithId = formTaskWithId(task);
        this.tasks.push(newTaskWithId)
  
        const res = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          body: JSON.stringify(newTaskWithId),
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
      },
      async updateTask(id, title) {
        const todoItem = this.tasks.find(task => task.id === id);
        todoItem.title = title;

        const res = await fetch('http://localhost:3000/tasks/' + id, {
          method: 'PATCH',
          body: JSON.stringify({title}),
          headers: {'Content-Type': 'application/json'}
        });

        if (res.error) {
          console.error(res.error)
        }
      }
    }
  },
)