import React, { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"

type EditableSpanPropsType = {
  oldTitle: string
  updateTitle: (newTitle: string) => void
  className?: string
  disabled?: boolean
}

export const EditableSpan = React.memo(({ oldTitle, className, updateTitle, disabled }: EditableSpanPropsType) => {
  //console.log('EditableSpan')
  const [edit, setEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(oldTitle)

  const editModeHandler = () => {
    if (disabled) return
    setEdit(!edit)
    if (edit) updateTitleHandler()
  }

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  const updateTitleHandler = () => {
    updateTitle(newTitle)
  }

  return edit ? (
    <TextField
      variant={"outlined"}
      value={newTitle}
      size={"small"}
      autoFocus
      onChange={changeTaskTitleHandler}
      onBlur={editModeHandler}
    />
  ) : (
    <span className={className} onDoubleClick={editModeHandler}>
      {oldTitle}
    </span>
  )
})
