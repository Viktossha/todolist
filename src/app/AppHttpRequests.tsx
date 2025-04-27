import Checkbox from "@mui/material/Checkbox"
import React, { ChangeEvent, useEffect, useState } from "react"
import { AddItemForm, EditableSpan } from "common/components"
import axios from "axios"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import type { Todolist } from "../features/todolists/api/todolistsApi.types"
import type { Task, UpdateTaskModel } from "../features/todolists/api/tasksApi.types"
import type { Response } from "common/types"
import { TaskStatus } from "../features/todolists/lib/enums"
import { tasksApi } from "../features/todolists/api/tasksApi"

const configs = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
    "API-KEY": process.env.REACT_APP_API_KEY,
  },
}

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({})

  useEffect(() => {
    todolistsApi.getTodolist().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((tl) => {
        tasksApi.getTasks(tl.id).then((res) => {
          console.log(res)
          setTasks({ ...tasks, [tl.id]: res.data.items })
        })
      })
    })
  }, [])

  const createTodolistHandler = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => setTodolists([res.data.data.item, ...todolists]))
  }

  const removeTodolistHandler = (id: string) => {
    todolistsApi.deleteTodolist(id).then(() => setTodolists(todolists.filter((el) => el.id !== id)))
  }

  const updateTodolistHandler = (id: string, title: string) => {
    todolistsApi
      .updateTodolist({ id, title })
      .then((res) => setTodolists(todolists.map((el) => (el.id === id ? { ...el, title: title } : el))))
  }

  const createTaskHandler = (title: string, todolistId: string) => {
    tasksApi.createTask({ title, todolistId }).then((res) => {
      const newTask = res.data.data.item
      // console.log(tasks, 'tasks object');
      // console.log(todolistId, 'todolistId');
      // console.log(tasks[todolistId], 'tasks[todolistId]');
      // console.log(res.data)
      setTasks({
        ...tasks,
        [todolistId]: [newTask, ...(tasks[todolistId] || [])],
      })
    })
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    tasksApi.deleteTask({ taskId, todolistId }).then(() => {
      setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId) })
    })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task) => {
    const model: UpdateTaskModel = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
    }

    tasksApi.updateTask({ taskId: task.id, todolistId: task.todoListId, model }).then((res) => {
      const newTask = res.data.data.item
      setTasks({ ...tasks, [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? newTask : t)) })

      //const newTasks = tasks[task.todoListId].map(t => (t.id === task.id ? { ...t, ...model } : t))
      // setTasks({ ...tasks, [task.todoListId]: newTasks })
    })
  }

  const changeTaskTitleHandler = (title: string, task: Task) => {
    const model: UpdateTaskModel = {
      title: title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
    }

    axios
      .put<
        Response<{ item: Task }>
      >(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`, model, configs)
      .then((res) => {
        const newTask = res.data.data.item
        setTasks({ ...tasks, [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? newTask : t)) })
      })
  }

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl: any) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan oldTitle={tl.title} updateTitle={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: Task) => {
                return (
                  <div key={task.id}>
                    <Checkbox checked={task.status === 2} onChange={(e) => changeTaskStatusHandler(e, task)} />
                    <EditableSpan oldTitle={task.title} updateTitle={(title) => changeTaskTitleHandler(title, task)} />
                    <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

// Styles
const todolist: React.CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
