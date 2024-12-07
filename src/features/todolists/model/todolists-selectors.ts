import type {RootState} from "../../../app/store";
import type {TodoListType} from "../../../app/App";

export const selectTodolists = (state: RootState): TodoListType[] => state.todolists
