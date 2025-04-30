import type { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import type { Response } from "common/types"
import { instanse } from "common/instance"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instanse.get<GetTasksResponse>(`${todolistId}/tasks`)
  },
  createTask(payload: { title: string; todolistId: string }) {
    return instanse.post<Response<{ item: DomainTask }>>(`todo-lists/${payload.todolistId}/tasks`, {
      title: payload.title,
    })
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    return instanse.delete<Response>(`todo-lists/${payload.todolistId}/tasks/${payload.taskId}`)
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    return instanse.put<Response<{ item: DomainTask }>>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
      { model: payload.model },
    )
  },
}
