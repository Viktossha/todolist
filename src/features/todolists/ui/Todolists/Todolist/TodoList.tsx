import React, { useCallback } from "react"
// import {Button} from "./Button";
import { TodoListHeader } from "./TodoListHeader/TodoListHeader"
import { AddItemForm } from "common/components"
import { Tasks } from "./Tasks/Tasks"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { addTaskTC } from "../../../model/tasksSlice"
import { useAppDispatch } from "../../../../../app/hooks"
import type { DomainTodolist } from "../../../model/todolistsSlice"
import {useCreateTaskMutation} from "../../../api/tasksApi";

type TodoListPropsType = {
  todolist: DomainTodolist
}

export const TodoList = React.memo(({ todolist }: TodoListPropsType) => {

    const [createTask] = useCreateTaskMutation()

  const addTask = (title: string) => {
      createTask({title, todolistId: todolist.id})
    }

  return (
    <div className="todolist">
      <TodoListHeader todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
})
