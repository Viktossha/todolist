import type { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import type { Response } from "common/types"
import { instance } from "common/instance"

export const tasksApi = {
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
