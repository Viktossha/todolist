import type {RootState} from "../../../app/store";
import type {TasksType} from "../../../app/App";

export const selectTasks = (state: RootState): TasksType => state.tasks