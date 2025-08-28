import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import AddBoxIcon from "@mui/icons-material/AddBox"
import IconButton from "@mui/material/IconButton"

type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = React.memo(({ addItem, disabled }: AddItemFormPropsType) => {
  const [title, setTitle] = useState("")
  const [inputError, setInputError] = useState<string>("")

  const addNewTaskHandler = () => {
    const trimmedTaskTitle = title.trim()

    if (trimmedTaskTitle && trimmedTaskTitle.length <= 15) {
      addItem(trimmedTaskTitle)
      setTitle("")
    } else if (trimmedTaskTitle.length > 15) {
      setInputError("Title is long")
    } else {
      setInputError("Please, enter a title")
    }
  }

  const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    inputError && setInputError("")
    setTitle(e.currentTarget.value)
    if (e.currentTarget.value.length > 15) {
      setInputError("Title is long")
    } else {
      setInputError("")
    }
  }

  const onKeyDownAddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isAddTaskPossible) {
      addNewTaskHandler()
    }
  }

  const isAddTaskPossible = title.length && title.length <= 15

  return (
    <div>
      <div>
        <TextField
          label="Enter a title"
          variant={"outlined"}
          className={inputError ? "input-error" : ""}
          error={inputError.length > 0}
          value={title}
          size={"small"}
          onChange={setTaskTitleHandler}
          onKeyDown={onKeyDownAddNewTaskHandler}
          helperText={inputError.length > 0 && inputError}
          disabled={disabled}
        />
        <IconButton onClick={addNewTaskHandler} disabled={disabled || !isAddTaskPossible} color={"primary"}>
          <AddBoxIcon />
        </IconButton>
      </div>
    </div>
  )
})
