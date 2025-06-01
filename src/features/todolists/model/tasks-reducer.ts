import { TasksType } from "../../../app/App"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import type { AppDispatch } from "../../../app/store"
import { tasksApi } from "../api/tasksApi"
import type { DomainTask } from "../api/tasksApi.types"
import { TaskStatus } from "../lib/enums"
import { setAppErrorAC, setAppStatusAC } from "../../../app/app-reducer"
import { ResultCode } from "common/enums/enums"

export type RemoveTaskActionType = {
  type: "REMOVE-TASK"
  payload: {
    todolistId: string
    taskId: string
  }
}

export type AddTaskActionType = {
  type: "ADD-TASK"
  payload: {
    task: DomainTask
  }
}

export type updateTaskActionType = {
  type: "UPDATE-TASK"
  payload: {
    task: DomainTask
  }
}

export type setTasksActionType = {
  type: "SET-TASKS"
  payload: {
    todolistId: string
    tasks: DomainTask[]
  }
}

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | updateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | setTasksActionType

export let initialTasksState: TasksType = {}

export const tasksReducer = (state = initialTasksState, action: ActionsType): TasksType => {
  switch (action.type) {
    case "SET-TASKS": {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }
    }
    case "ADD-TASK": {
      let newTask: DomainTask = action.payload.task
      return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] }
    }
    //TODO:: проверить этот кейс
    case "UPDATE-TASK": {
      const newTask = action.payload.task
      return {
        ...state,
        [newTask.todoListId]: state[newTask.todoListId].map((t) =>
          t.id === newTask.id
            ? {
                ...t,
                title: newTask.title,
                status: newTask.status,
              }
            : t,
        ),
      }
    }
    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todolist.id]: [] }
    }
    case "REMOVE-TODOLIST": {
      let copyState = { ...state }
      delete copyState[action.payload.id]
      return copyState
    }
    default:
      return state
  }
}

export const setTasksAC = (todolistId: string, tasks: DomainTask[]) => {
  return {
    type: "SET-TASKS",
    payload: {
      todolistId,
      tasks,
    },
  } as const
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
  return {
    type: "REMOVE-TASK",
    payload: {
      todolistId,
      taskId,
    },
  }
}

export const addTaskAC = (task: DomainTask): AddTaskActionType => {
  return {
    type: "ADD-TASK",
    payload: {
      task,
    },
  }
}

export const updateTaskAC = (task: DomainTask): updateTaskActionType => {
  return {
    type: "UPDATE-TASK",
    payload: {
      task,
    },
  }
}

//Thunks
export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi.getTasks(todolistId).then((res) => {
      dispatch(setTasksAC(todolistId, res.data.items))
      dispatch(setAppStatusAC("succeeded"))
    })
  }
}

export const removeTaskTC = (todolistId: string, taskId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi.deleteTask({ todolistId, taskId }).then((res) => {
      dispatch(removeTaskAC(todolistId, taskId))
      dispatch(setAppStatusAC("succeeded"))
    })
  }
}

export const addTaskTC = (todolistId: string, title: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi.createTask({ title, todolistId }).then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTaskAC(res.data.data.item))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : "Some error occurred"))
        dispatch(setAppStatusAC("failed"))
      }
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

    tasksApi
      .updateTask({ taskId: task.id, todolistId: task.todoListId, model })
      .then((res) => dispatch(updateTaskAC(task)))
  }
}
