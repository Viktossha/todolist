import type { AppDispatch } from "../../app/store"
import type { Response } from "common/types"
import { setAppError, setAppStatus } from "../../app/appSlice"

export const handleServerAppError = <T>(dispatch: AppDispatch, data: Response<T>) => {
  dispatch(setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }))
  dispatch(setAppStatus({ status: "failed" }))
}
