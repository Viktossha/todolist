import type { RootState } from "../../../app/store"
import type { DomainTodolist } from "./todolistsSlice"

export const selectTodolists = (state: RootState): DomainTodolist[] => state.todolists
