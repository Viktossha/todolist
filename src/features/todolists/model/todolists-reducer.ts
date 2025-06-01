import type { FilterValuesType } from "../../../app/App"
import type { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import type { AppDispatch } from "../../../app/store"
import { type RequestStatus, setAppErrorAC, setAppStatusAC } from "../../../app/app-reducer"
import { ResultCode } from "common/enums/enums"
import { addTaskAC } from "./tasks-reducer"

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST"
  payload: {
    id: string
  }
}

export type AddTodolistActionType = {
  type: "ADD-TODOLIST"
  payload: {
    todolist: Todolist
  }
}

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE"
  payload: {
    id: string
    title: string
  }
}

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER"
  payload: {
    id: string
    filter: FilterValuesType
  }
}

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

export type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
  | ChangeTodolistEntityStatusActionType

export let initialTodolistsState: DomainTodolist[] = []

export const todolistsReducer = (state = initialTodolistsState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    }
    case "REMOVE-TODOLIST": {
      return state.filter((l) => l.id !== action.payload.id) // логика по удалению тудулиста
    }
    case "ADD-TODOLIST": {
      const newTodolist = action.payload.todolist
      return [{ ...newTodolist, filter: "all", entityStatus: "idle" }, ...state] // логика по добавлению тудулиста
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((el) => (el.id === action.payload.id ? { ...el, title: action.payload.title } : el))
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((el) => (el.id === action.payload.id ? { ...el, filter: action.payload.filter } : el))
    }
    case "CHANGE-TODOLIST-ENTITY-STATUS": {
      return state.map((el) =>
        el.id === action.payload.id ? { ...el, entityStatus: action.payload.entityStatus } : el,
      )
    }
    default:
      return state
  }
}

export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const
}

export const removeTodoListAC = (id: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: {
      id,
    },
  } as const
}

export const addTodoListAC = (todolist: Todolist) => {
  return {
    type: "ADD-TODOLIST",
    payload: {
      todolist,
    },
  } as const
}

export const updateTodoListTitleAC = (id: string, title: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
      id,
      title,
    },
  } as const
}

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
      id,
      filter,
    },
  } as const
}

export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatus) => {
  return {
    type: "CHANGE-TODOLIST-ENTITY-STATUS",
    payload: {
      id,
      entityStatus,
    },
  } as const
}

///Thunks
export const fetchTodolistsTC = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi.getTodolists().then((res) => {
      dispatch(setTodolistsAC(res.data))
      dispatch(setAppStatusAC("succeeded"))
    })
  }
}

export const addTodolistTC = (title: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTodoListAC(res.data.data.item))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : "Some error occurred"))
          dispatch(setAppStatusAC("failed"))
        }
      })
      .catch((err) => {
        dispatch(setAppErrorAC(err.message))
        dispatch(setAppStatusAC("failed"))
      })
  }
}

export const removeTodolistTC = (id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodolistEntityStatusAC(id, "loading"))
    todolistsApi.deleteTodolist(id).then(() => {
      dispatch(removeTodoListAC(id))
      dispatch(setAppStatusAC("succeeded"))
    })
  }
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => {
  return (dispatch: AppDispatch) => {
    todolistsApi.updateTodolist(arg).then((res) => dispatch(updateTodoListTitleAC(arg.id, arg.title)))
  }
}
