import type { AppDispatch } from "../../app/store"
import { setAppError, setAppStatus } from "../../app/appSlice"

export const handleServerNetworkError = (err: { message: string }, dispatch: AppDispatch) => {
  dispatch(setAppError({ error: err.message }))
  dispatch(setAppStatus({ status: "failed" }))
}
