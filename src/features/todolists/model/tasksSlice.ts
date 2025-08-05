import type { AppDispatch, RootState } from "../../../app/store"
import { _tasksApi } from "../api/tasksApi"
import type { DomainTask } from "../api/tasksApi.types"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { setAppStatus } from "../../../app/appSlice"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist } from "./todolistsSlice"

export type TasksType = {
  [key: string]: DomainTask[]
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksType,
  reducers: (create) => {
    return {
      setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      }),
      removeTask: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
        const tasks = state[action.payload.todolistId]
        const taskIndex = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (taskIndex !== -1) state[action.payload.todolistId].splice(taskIndex, 1)
      }),
      addTask: create.reducer<{ task: DomainTask }>((state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift(action.payload.task)
      }),
      //      const newTask = action.payload.task
      //       return {
      //         ...state,
      //         [newTask.todoListId]: state[newTask.todoListId].map((t) =>
      //           t.id === newTask.id
      //             ? {
      //                 ...t,
      //                 title: newTask.title,
      //                 status: newTask.status,
      //               }
      //             : t,
      //         ),
      //       }
      updateTask: create.reducer<{ task: DomainTask }>((state, action) => {
        const tasks = state[action.payload.task.todoListId]
        const task = tasks.find((t) => t.id === action.payload.task.id)
        if (task) {
          task.title = action.payload.task.title
          task.status = action.payload.task.status
        }
      }),
      clearTasks: create.reducer((state, action) => {
        return {}
      }),
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
  },
  selectors: {
    selectTasks: (state): TasksType => state,
  },
})

export const { addTask, clearTasks, removeTask, updateTask, setTasks } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors

//Thunks
export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    _tasksApi
      .getTasks(todolistId)
      .then((res) => {
        dispatch(setTasks({ todolistId, tasks: res.data.items }))
        dispatch(setAppStatus({ status: "succeeded" }))
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
}

export const removeTaskTC = (todolistId: string, taskId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    _tasksApi
      .deleteTask({ todolistId, taskId })
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(removeTask({ todolistId, taskId }))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
}

export const addTaskTC = (todolistId: string, title: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    _tasksApi
      .createTask({ title, todolistId })
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTask({ task: res.data.data.item }))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
}

export const updateTaskTC = (task: DomainTask) => {
  return (dispatch: AppDispatch) => {
    const model = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
    }
    dispatch(setAppStatus({ status: "loading" }))
    _tasksApi
      .updateTask({ taskId: task.id, todolistId: task.todoListId, model })
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(updateTask({ task }))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((err) => handleServerNetworkError(err, dispatch))
  }
}
