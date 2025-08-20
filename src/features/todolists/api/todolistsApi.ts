import type { Todolist } from "./todolistsApi.types"
import { instance } from "common/instance/instance"
import type { Response } from "common/types"
import { baseApi } from "../../../app/baseApi"
import { DomainTodolist } from "../lib/types/types"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTodolists: builder.query<DomainTodolist[], void>({
        query: () => "todo-lists",
        transformResponse(todolists: Todolist[]): DomainTodolist[] {
          return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
        },
        providesTags: ["Todolist"],
      }),
      createTodolist: builder.mutation<Response<{ item: Todolist }>, string>({
        query: (title) => {
          return {
            method: "POST",
            url: "todo-lists",
            body: { title },
          }
        },
        invalidatesTags: ["Todolist"],
      }),
      deleteTodolist: builder.mutation<Response, string>({
        query: (id) => {
          return {
            method: "DELETE",
            url: `todo-lists/${id}`,
          }
        },
        invalidatesTags: ["Todolist"],
      }),
      updateTodolist: builder.mutation<Response, { id: string; title: string }>({
        query: ({ id, title }) => {
          return {
            method: "PUT",
            url: `todo-lists/${id}`,
            body: { title },
          }
        },
        invalidatesTags: ["Todolist"],
      }),
    }
  },
})

export const { useGetTodolistsQuery, useCreateTodolistMutation, useDeleteTodolistMutation, useUpdateTodolistMutation } =
  todolistsApi
