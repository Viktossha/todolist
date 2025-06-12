import type { Response } from "common/types"
import type { LoginArgs } from "./authApi.types"
import { instance } from "common/instance"

export const authApi = {
  login(args: LoginArgs) {
    return instance.post<Response<{ userId: number; token: string }>>("auth/login", args)
  },
}
