import React, { ChangeEvent } from "react"
import ListItem from "@mui/material/ListItem"
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch } from "../../../../../../../app/hooks"
import { getListItemSX } from "./Task.styles"
import type { DomainTodolist } from "../../../../../model/todolistsSlice"
import type { DomainTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../../lib/enums"
import { useRemoveTaskMutation, useUpdateTaskMutation } from "../../../../../api/tasksApi"

type TaskPropsType = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = React.memo(({ task, todolist }: TaskPropsType) => {
  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const removeTaskHandler = () => {
    removeTask({ taskId: task.id, todolistId: todolist.id })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const newTask = { ...task, status }
    updateTask({ taskId: task.id, todolistId: todolist.id, model: newTask })
  }

  const updateTaskTitle = (newTitle: string) => {
    const newTask = { ...task, title: newTitle }
    updateTask({ taskId: task.id, todolistId: todolist.id, model: newTask })
  }

  return (
    <ListItem sx={getListItemSX(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          onChange={changeTaskStatus}
          checked={task.status === TaskStatus.Completed}
          disabled={todolist.entityStatus === "loading"}
        />
        <EditableSpan
          oldTitle={task.title}
          updateTitle={updateTaskTitle}
          disabled={todolist.entityStatus === "loading"}
        />
      </div>

      <IconButton aria-label="delete" onClick={removeTaskHandler} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
})
