import type { Todolist } from "./todolistsApi.types"
import { instanse } from "common/instance/instanse"
import type { Response } from "common/types"

export const todolistsApi = {
  getTodolists: () => {
    return instanse.get<Todolist[]>("todo-lists")
  },
  createTodolist: (title: string) => {
    return instanse.post<Response<{ item: Todolist }>>("todo-lists", { title })
  },
  deleteTodolist: (id: string) => {
    return instanse.delete<Response>(`todo-lists/${id}`)
  },
  updateTodolist: (args: { id: string; title: string }) => {
    return instanse.put<Response>(`todo-lists/${args.id}`, {
      title: args.title,
    })
  },
}
