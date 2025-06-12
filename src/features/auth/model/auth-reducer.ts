import type { LoginArgs } from "../api/authApi.types"
import type { AppDispatch } from "../../../app/store"
import { setAppStatusAC } from "../../../app/app-reducer"
import { authApi } from "../api/authApi"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { addTaskAC } from "../../todolists/model/tasks-reducer"

type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    default:
      return state
  }
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}

// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC>

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC(true))
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
