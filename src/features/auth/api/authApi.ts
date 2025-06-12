import type { Response } from "common/types"
import type { LoginArgs } from "./authApi.types"
import { instance } from "common/instance"

export const authApi = {
  login(args: LoginArgs) {
    return instance.post<Response<{ userId: number; token: string }>>("auth/login", args)
  },
  logout() {
    return instance.delete<Response>("auth/login")
  },
  me() {
    return instance.get<Response<{ id: number; email: string; login: string }>>("auth/me")
  },
}
