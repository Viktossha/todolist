import type { Todolist } from "./todolistsApi.types"
import { instance } from "common/instance/instance"
import type { Response } from "common/types"

export const todolistsApi = {
  getTodolists: () => {
    return instance.get<Todolist[]>("todo-lists")
  },
  createTodolist: (title: string) => {
    return instance.post<Response<{ item: Todolist }>>("todo-lists", { title })
  },
  deleteTodolist: (id: string) => {
    return instance.delete<Response>(`todo-lists/${id}`)
  },
  updateTodolist: (args: { id: string; title: string }) => {
    return instance.put<Response>(`todo-lists/${args.id}`, {
      title: args.title,
    })
  },
}
