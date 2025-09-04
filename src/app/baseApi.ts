import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { handleError } from "common/utils"

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
      credentials: "include",
    })(args, api, extraOptions)

    handleError(api, result)

    return result
  },
  tagTypes: ["Todolist", "Task"],
  endpoints: () => ({}),
})
