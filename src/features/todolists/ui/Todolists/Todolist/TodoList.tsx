import React, { useCallback } from "react"
// import {Button} from "./Button";
import { TodoListHeader } from "./TodoListHeader/TodoListHeader"
import { AddItemForm } from "common/components"
import { Tasks } from "./Tasks/Tasks"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { addTaskTC } from "../../../model/tasks-reducer"
import { useAppDispatch } from "../../../../../app/hooks"
import type { DomainTodolist } from "../../../model/todolistsSlice"

type TodoListPropsType = {
  todolist: DomainTodolist
}

// export type TaskType = {
//   id: string
//   title: string
//   isDone: boolean
// }

export const TodoList = React.memo(({ todolist }: TodoListPropsType) => {
  let dispatch = useAppDispatch()

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskTC(todolist.id, title))
    },
    [dispatch],
  )

  return (
    <div className="todolist">
      <TodoListHeader todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
})
