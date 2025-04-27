import React, { useCallback } from "react"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { type DomainTodolist, removeTodoListAC, updateTodoListTitleAC } from "../../../../model/todolists-reducer"
import { useAppDispatch } from "../../../../../../app/hooks"
import styles from "./TodoListHeader.module.css"

type TodoListHeaderPropsType = {
  todolist: DomainTodolist
}
export const TodoListHeader = ({ todolist }: TodoListHeaderPropsType) => {
  let dispatch = useAppDispatch()

  const updateTodoListTitle = useCallback(
    (newTitle: string) => {
      dispatch(updateTodoListTitleAC(todolist.id, newTitle))
    },
    [dispatch],
  )

  const removeTodoList = useCallback(() => {
    dispatch(removeTodoListAC(todolist.id))
  }, [dispatch])

  return (
    <div>
      <EditableSpan className={styles.todolistTitle} oldTitle={todolist.title} updateTitle={updateTodoListTitle} />
      <IconButton aria-label="delete" onClick={removeTodoList}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
