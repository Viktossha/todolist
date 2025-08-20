import React, { useCallback } from "react"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch } from "../../../../../../app/hooks"
import styles from "./TodoListHeader.module.css"
import { todolistsApi, useDeleteTodolistMutation, useUpdateTodolistMutation } from "../../../../api/todolistsApi"
import type { RequestStatus } from "../../../../../../app/appSlice"
import { DomainTodolist } from "../../../../lib/types/types"

type TodoListHeaderPropsType = {
  todolist: DomainTodolist
}
export const TodoListHeader = ({ todolist }: TodoListHeaderPropsType) => {
  const [updateTodolist] = useUpdateTodolistMutation()
  const updateTodoListTitle = (newTitle: string) => {
    updateTodolist({ id: todolist.id, title: newTitle })
  }

  const [deleteTodolist] = useDeleteTodolistMutation()

  const removeTodoList = () => {
    deleteTodolist(todolist.id)
  }

  return (
    <div>
      <EditableSpan
        className={styles.todolistTitle}
        oldTitle={todolist.title}
        updateTitle={updateTodoListTitle}
        disabled={todolist.entityStatus === "loading"}
      />
      <IconButton aria-label="delete" onClick={removeTodoList} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
