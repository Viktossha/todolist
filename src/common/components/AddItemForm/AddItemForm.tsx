import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import AddBoxIcon from "@mui/icons-material/AddBox"
import IconButton from "@mui/material/IconButton"

type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = React.memo(({ addItem, disabled }: AddItemFormPropsType) => {
  //console.log('AddItemForm')
  const [taskTitle, setTaskTitle] = useState("")
  const [inputError, setInputError] = useState<boolean>(false)

  const addNewTaskHandler = () => {
    const trimmedTaskTitle = taskTitle.trim()
    if (trimmedTaskTitle) {
      addItem(trimmedTaskTitle)
    } else {
      setInputError(true)
    }
    setTaskTitle("")
  }

  const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    inputError && setInputError(false)
    setTaskTitle(e.currentTarget.value)
  }

  const onKeyDownAddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isAddTaskPossible) {
      addNewTaskHandler()
    }
  }

  const isAddTaskPossible = taskTitle.length && taskTitle.length <= 15

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <TextField
        label="Enter a title"
        variant={"outlined"}
        className={inputError ? "input-error" : ""}
        error={inputError}
        value={taskTitle}
        size={"small"}
        onChange={setTaskTitleHandler}
        onKeyDown={onKeyDownAddNewTaskHandler}
        helperText={inputError && "Please, enter a title"}
        disabled={disabled}
      />
      <IconButton onClick={addNewTaskHandler} disabled={disabled || !isAddTaskPossible} color={"primary"}>
        <AddBoxIcon />
      </IconButton>
      {taskTitle.length > 15 && <div>Task title is long</div>}
    </div>
  )
})
