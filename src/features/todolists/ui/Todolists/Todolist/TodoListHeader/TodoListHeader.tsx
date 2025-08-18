import React, { useCallback } from "react"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { type DomainTodolist } from "../../../../model/todolistsSlice"
import { useAppDispatch } from "../../../../../../app/hooks"
import styles from "./TodoListHeader.module.css"
import { todolistsApi, useDeleteTodolistMutation, useUpdateTodolistMutation } from "../../../../api/todolistsApi"
import type { RequestStatus } from "../../../../../../app/appSlice"

type TodoListHeaderPropsType = {
  todolist: DomainTodolist
}
export const TodoListHeader = ({ todolist }: TodoListHeaderPropsType) => {
  const dispatch = useAppDispatch()
  const [updateTodolist] = useUpdateTodolistMutation()
  const updateTodoListTitle = (newTitle: string) => {
    updateTodolist({ id: todolist.id, title: newTitle })
  }

  const [deleteTodolist] = useDeleteTodolistMutation()

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todo = state.find((todo) => todo.id === todolist.id)
        if (todo) todo.entityStatus = status
      }),
    )
  }
  const removeTodoList = () => {
    updateQueryData("loading")
    deleteTodolist(todolist.id)
      .unwrap()
      .catch(() => {
        updateQueryData("failed")
      })
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
