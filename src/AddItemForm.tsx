import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(({addItem}: AddItemFormPropsType) => {
    //console.log('AddItemForm')
    const [taskTitle, setTaskTitle] = useState('')
    const [inputError, setInputError] = useState<boolean>(false)

    const addNewTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            addItem(trimmedTaskTitle)
        } else {
            setInputError(true)
        }
        setTaskTitle('')
    }

    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(false)
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyDownAddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && isAddTaskPossible) {
            addNewTaskHandler()
        }
    }

    const isAddTaskPossible = taskTitle.length && taskTitle.length <= 15

    return (
        <div>
            <TextField
                label="Enter a title"
                variant={'outlined'}
                className={inputError ? 'input-error' : ''}
                error={inputError}
                value={taskTitle}
                size={'small'}
                onChange={setTaskTitleHandler}
                onKeyDown={onKeyDownAddNewTaskHandler}
                helperText={inputError && 'Please, enter a title'}
            />
            <IconButton onClick={addNewTaskHandler} disabled={!isAddTaskPossible} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>
            {taskTitle.length > 15 && <div>Task title is long</div>}
        </div>
    );
});