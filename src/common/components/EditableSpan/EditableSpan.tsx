import React, { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"

type EditableSpanPropsType = {
  oldTitle: string
  updateTitle: (newTitle: string) => void
  className?: string
  disabled?: boolean
}

export const EditableSpan = React.memo(({ oldTitle, className, updateTitle, disabled }: EditableSpanPropsType) => {
  const [edit, setEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(oldTitle)
  const [inputError, setInputError] = useState<boolean>(false)

  const editModeHandler = () => {
    if (disabled) return
    setEdit(!edit)
    if (edit) updateTitleHandler()
  }

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
    if (newTitle.length < 30) {
      setInputError(false)
    } else {
      setInputError(true)
    }
  }

  const updateTitleHandler = () => {
    !inputError && updateTitle(newTitle)
  }

  return edit ? (
    <>
      <TextField
        variant={"outlined"}
        value={newTitle}
        size={"small"}
        autoFocus
        onChange={changeTaskTitleHandler}
        onBlur={editModeHandler}
        helperText={inputError && "Title is long"}
        className={inputError ? "input-error" : ""}
        error={inputError}
      />
    </>
  ) : (
    <span className={className} onDoubleClick={editModeHandler}>
      {oldTitle}
    </span>
  )
})
