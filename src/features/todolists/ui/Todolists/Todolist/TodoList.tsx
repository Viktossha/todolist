import React from "react"
// import {Button} from "./Button";
import { TodoListHeader } from "./TodoListHeader/TodoListHeader"
import { AddItemForm } from "common/components"
import { Tasks } from "./Tasks/Tasks"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { useCreateTaskMutation } from "../../../api/tasksApi"
import { DomainTodolist } from "../../../lib/types/types"

type TodoListPropsType = {
  todolist: DomainTodolist
}

export const TodoList = React.memo(({ todolist }: TodoListPropsType) => {
  const [createTask] = useCreateTaskMutation()

  const addTask = (title: string) => {
    createTask({ title, todolistId: todolist.id })
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
