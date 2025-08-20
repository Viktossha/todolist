import type { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import type { Response } from "common/types"
import { instance } from "common/instance"
import { baseApi } from "../../../app/baseApi"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTasks: builder.query<GetTasksResponse, string>({
        query: (todolistId) => `todo-lists/${todolistId}/tasks`,
        providesTags: (result, error, todolistId) =>
          result
            ? [...result.items.map(({ id }) => ({ type: "Task", id }) as const), { type: "Task", id: todolistId }]
            : ["Task"],
      }),
      createTask: builder.mutation<Response<{ item: DomainTask }>, { title: string; todolistId: string }>({
        query: ({ title, todolistId }) => {
          return {
            method: "POST",
            url: `todo-lists/${todolistId}/tasks`,
            body: { title },
          }
        },
        invalidatesTags: (result, error, { todolistId }) => [{ type: "Task", id: todolistId }],
      }),
      removeTask: builder.mutation<Response, { todolistId: string; taskId: string }>({
        query: ({ todolistId, taskId }) => {
          return {
            method: "DELETE",
            url: `todo-lists/${todolistId}/tasks/${taskId}`,
          }
        },
        //invalidatesTags: ["Task"],
        invalidatesTags: (result, error, { taskId }) => [{ type: "Task", id: taskId }],
      }),
      updateTask: builder.mutation<
        Response<{ item: DomainTask }>,
        { todolistId: string; taskId: string; model: UpdateTaskModel }
      >({
        query: ({ todolistId, taskId, model }) => {
          return {
            method: "PUT",
            url: `todo-lists/${todolistId}/tasks/${taskId}`,
            body: model,
          }
        },
        invalidatesTags: (result, error, { taskId }) => [{ type: "Task", id: taskId }],
      }),
    }
  },
})

export const { useGetTasksQuery, useCreateTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = tasksApi
