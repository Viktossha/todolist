import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setAppError } from "./appSlice"

export const baseApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: async (args, api, extraOptions) => {
    //await new Promise((resolve) => setTimeout(resolve, 2000)) //эмуляция задержки
    const result = await fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`)
        headers.set("Authorization", `Bearer ${localStorage.getItem("sn-token")}`)
      },
    })(args, api, extraOptions)

    if (result.error) {
      if (result.error.status === "FETCH_ERROR" || result.error.status === "PARSING_ERROR") {
        api.dispatch(setAppError({ error: result.error.error }))
      }

      if (result.error.status === 400 || result.error.status === 500) {
        api.dispatch(setAppError({ error: (result.error.data as { message: string }).message }))
      }

      if (result.error.status === 403) {
        api.dispatch(setAppError({ error: "403 Forbidden Error. Check API-KEY" }))
      }
    }

    return result
  },
  tagTypes: ["Todolist", "Task"],
  endpoints: () => ({}),
})
