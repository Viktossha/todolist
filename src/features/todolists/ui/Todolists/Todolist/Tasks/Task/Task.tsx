import React, { ChangeEvent, useCallback } from "react"
import ListItem from "@mui/material/ListItem"
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { removeTaskTC, updateTaskTC } from "../../../../../model/tasks-reducer"
import { useAppDispatch } from "../../../../../../../app/hooks"
import { getListItemSX } from "./Task.styles"
import type { DomainTodolist } from "../../../../../model/todolistsSlice"
import type { DomainTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../../lib/enums"

type TaskPropsType = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = React.memo(({ task, todolist }: TaskPropsType) => {
  let dispatch = useAppDispatch()

  const removeTask = useCallback(() => {
    dispatch(removeTaskTC(todolist.id, task.id))
  }, [dispatch])

  const changeTaskStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
      const newTask = { ...task, status }
      dispatch(updateTaskTC(newTask))
    },
    [dispatch],
  )

  const updateTaskTitle = useCallback(
    (newTitle: string) => {
      const newTask = { ...task, title: newTitle }
      dispatch(updateTaskTC(newTask))
    },
    [dispatch],
  )

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

      <IconButton aria-label="delete" onClick={removeTask} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
})
