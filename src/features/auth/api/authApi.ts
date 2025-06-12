import { instanse } from "common/instance/instanse"
import type { Response } from "common/types"
import type { LoginArgs } from "./authApi.types"

export const authApi = {
  login(args: LoginArgs) {
    return instanse.post<Response<{ userId: number; token: string }>>("auth/login", args)
  },
}
