import type { FilterValuesType } from "../../../app/App"
import type { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import type { AppDispatch, RootState } from "../../../app/store"
import { type RequestStatus, setAppStatus } from "../../../app/appSlice"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { createSlice } from "@reduxjs/toolkit"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => {
    return {
      setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
        //action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
        action.payload.todolists.forEach((tl) => {
          state.push({ ...tl, filter: "all", entityStatus: "idle" })
        })
      }),
      removeTodolist: create.reducer<{ id: string }>((state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
      }),
      addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
      }),
      updateTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
        const todolist = state.find((todo) => todo.id === action.payload.id)
        if (todolist) todolist.title = action.payload.title
      }),
      updateTodolistFilter: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
        const todolist = state.find((todo) => todo.id === action.payload.id)
        if (todolist) todolist.filter = action.payload.filter
      }),
      updateTodolistEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
        const todolist = state.find((todo) => todo.id === action.payload.id)
        if (todolist) todolist.entityStatus = action.payload.entityStatus
      }),
      clearTodolist: create.reducer((state, action) => {
        return []
      }),
    }
  },
  selectors: {
    selectTodolists: (state): DomainTodolist[] => state,
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const {
  setTodolists,
  updateTodolistFilter,
  updateTodolistEntityStatus,
  clearTodolist,
  removeTodolist,
  updateTodolistTitle,
  addTodolist,
} = todolistsSlice.actions

export const { selectTodolists } = todolistsSlice.selectors

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

///Thunks
export const fetchTodolistsTC = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistsApi
      .getTodolists()
      .then((res) => {
        dispatch(setTodolists({ todolists: res.data }))
        dispatch(setAppStatus({ status: "succeeded" }))
      })
      .catch((err) => handleServerNetworkError(err, dispatch))
  }
}

export const addTodolistTC = (title: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistsApi
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTodolist({ todolist: res.data.data.item }))
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

export const removeTodolistTC = (id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    dispatch(updateTodolistEntityStatus({ id, entityStatus: "loading" }))
    todolistsApi
      .deleteTodolist(id)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(removeTodolist({ id }))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
        dispatch(updateTodolistEntityStatus({ id, entityStatus: "failed" }))
      })
  }
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistsApi
      .updateTodolist(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(updateTodolistTitle({ id: arg.id, title: arg.title }))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((err) => handleServerNetworkError(err, dispatch))
  }
}
