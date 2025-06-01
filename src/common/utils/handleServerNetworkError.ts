import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"
import type { AppDispatch } from "../../app/store"

export const handleServerNetworkError = (err: { message: string }, dispatch: AppDispatch) => {
  dispatch(setAppErrorAC(err.message))
  dispatch(setAppStatusAC("failed"))
}
