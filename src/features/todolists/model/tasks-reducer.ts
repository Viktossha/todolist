import { TasksType } from "../../../app/App"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import type { AppDispatch } from "../../../app/store"
import { tasksApi } from "../api/tasksApi"
import type { DomainTask } from "../api/tasksApi.types"
import { TaskStatus } from "../lib/enums"

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

export type changeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS"
  payload: {
    task: DomainTask
  }
}

export type changeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE"
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
  | changeTaskStatusActionType
  | changeTaskTitleActionType
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
    case "CHANGE-TASK-STATUS": {
      const newTask = action.payload.task
      return {
        ...state,
        [newTask.todoListId]: state[newTask.todoListId].map((t) =>
          t.id === newTask.id
            ? {
                ...t,
                status: newTask.status,
              }
            : t,
        ),
      }
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.payload.task.todoListId]: state[action.payload.task.todoListId].map((t) =>
          t.id === action.payload.task.id
            ? {
                ...t,
                title: action.payload.task.title,
              }
            : t,
        ),
      }
    }
    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todolistId]: [] }
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

export const changeTaskStatusAC = (task: DomainTask): changeTaskStatusActionType => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: {
      task,
    },
  }
}

export const changeTaskTitleAC = (task: DomainTask): changeTaskTitleActionType => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload: {
      task,
    },
  }
}

//Thunks
export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: AppDispatch) => {
    tasksApi.getTasks(todolistId).then((res) => dispatch(setTasksAC(todolistId, res.data.items)))
  }
}

export const removeTaskTC = (todolistId: string, taskId: string) => {
  return (dispatch: AppDispatch) => {
    tasksApi.deleteTask({ todolistId, taskId }).then((res) => dispatch(removeTaskAC(todolistId, taskId)))
  }
}

export const addTaskTC = (todolistId: string, title: string) => {
  return (dispatch: AppDispatch) => {
    tasksApi.createTask({ title, todolistId }).then((res) => dispatch(addTaskAC(res.data.data.item)))
  }
}

export const updateTaskStatusTC = (task: DomainTask) => {
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
      .updateTask({ todolistId: task.todoListId, taskId: task.id, model })
      .then((res) => dispatch(changeTaskStatusAC(task)))
  }
}

export const updateTaskTitleTC = (task: DomainTask) => {
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
      .then(() => dispatch(changeTaskTitleAC(task)))
  }
}
