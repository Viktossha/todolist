import type { LoginArgs } from "../api/authApi.types"
import type { AppDispatch } from "../../../app/store"
import { setAppStatusAC } from "../../../app/app-reducer"
import { authApi } from "../api/authApi"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { addTaskAC } from "../../todolists/model/tasks-reducer"
import { clearTodosDataAC } from "../../todolists/model/todolists-reducer"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  // reducers: {
  //   setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
  //     state.isLoggedIn = action.payload.isLoggedIn
  //   },
  //   setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
  //     state.isInitialized = action.payload.isInitialized
  //   },
  // },

  //другой вариант RTK 2.0
  reducers: (create) => {
    return {
      setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      }),
      setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
        state.isInitialized = action.payload.isInitialized
      }),
    }
  },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedIn, setIsInitialized } = authSlice.actions

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setAppStatusAC("succeeded"))
        localStorage.setItem("sn-token", res.data.data.token)
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const logoutTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        dispatch(setAppStatusAC("succeeded"))
        localStorage.removeItem("sn-token")
        dispatch(clearTodosDataAC())
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const initializeAppTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
    .finally(() => dispatch(setIsInitialized({ isInitialized: true })))
}
