import type { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import type { Response } from "common/types"
import { instance } from "common/instance"
import { baseApi } from "../../../app/baseApi"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTasks: builder.query<GetTasksResponse, string>({
        query: (todolistId) => `todo-lists/${todolistId}/tasks`,
        providesTags: ["Task"],
      }),
      createTask: builder.mutation<Response<{ item: DomainTask }>, { title: string; todolistId: string }>({
        query: ({ title, todolistId }) => {
          return {
            method: "POST",
            url: `todo-lists/${todolistId}/tasks`,
            body: { title },
          }
        },
        invalidatesTags: ['Task']
      }),
      deleteTask: builder.mutation<Response, { todolistId: string; taskId: string }>({
        query: ({ todolistId, taskId }) => {
          return {
            method: "DELETE",
            url: `todo-lists/${todolistId}/tasks/${taskId}`,
          }
        },
        invalidatesTags: ['Task']
      }),
      updateTask: builder.mutation<Response<{ item: DomainTask }>, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
        query: ({ todolistId, taskId, model }) => {
          return {
            method: "PUT",
            url: `todo-lists/${todolistId}/tasks/${taskId}`,
            body: model,
          }
        },
        invalidatesTags: ['Task']
      }),
    }
  },
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi

export const _tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { title: string; todolistId: string }) {
    return instance.post<Response<{ item: DomainTask }>>(`todo-lists/${payload.todolistId}/tasks`, {
      title: payload.title,
    })
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    return instance.delete<Response>(`todo-lists/${payload.todolistId}/tasks/${payload.taskId}`)
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    return instance.put<Response<{ item: DomainTask }>>(
      `todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
      payload.model,
    )
  },
}
