import { v1 } from "uuid"
import type { FilterValuesType } from "../../../app/App"
import type { Todolist } from "../api/todolistsApi.types"

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST"
  payload: {
    id: string
  }
}

export type AddTodolistActionType = {
  type: "ADD-TODOLIST"
  payload: {
    title: string
    todolistId: string
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

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
}

export type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType

export let initialTodolistsState: DomainTodolist[] = []

export const todolistsReducer = (state = initialTodolistsState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }))
    }
    case "REMOVE-TODOLIST": {
      return state.filter((l) => l.id !== action.payload.id) // логика по удалению тудулиста
    }
    case "ADD-TODOLIST": {
      return [
        ...state,
        { id: action.payload.todolistId, title: action.payload.title, filter: "all", addedDate: "", order: 0 },
      ] // логика по добавлению тудулиста
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((el) => (el.id === action.payload.id ? { ...el, title: action.payload.title } : el))
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((el) => (el.id === action.payload.id ? { ...el, filter: action.payload.filter } : el))
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

export const addTodoListAC = (title: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: {
      title,
      todolistId: v1(),
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
