import React, { useCallback } from "react"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { type DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "../../../../model/todolists-reducer"
import { useAppDispatch } from "../../../../../../app/hooks"
import styles from "./TodoListHeader.module.css"

type TodoListHeaderPropsType = {
  todolist: DomainTodolist
}
export const TodoListHeader = ({ todolist }: TodoListHeaderPropsType) => {
  let dispatch = useAppDispatch()

  const updateTodoListTitle = useCallback(
    (newTitle: string) => {
      dispatch(updateTodolistTitleTC({ id: todolist.id, title: newTitle }))
    },
    [dispatch],
  )

  const removeTodoList = useCallback(() => {
    dispatch(removeTodolistTC(todolist.id))
  }, [dispatch])

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
