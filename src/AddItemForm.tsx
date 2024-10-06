import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: AddItemFormPropsType) => {
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
            <input value={taskTitle}
                   className={inputError ? 'input-error' : ''}
                   onChange={setTaskTitleHandler}
                   onKeyDown={onKeyDownAddNewTaskHandler}/>
            <Button title={'+'} onClickHandler={addNewTaskHandler} isDisabled={!isAddTaskPossible}/>
            {taskTitle.length > 15 && <div>Task title is long</div>}
            {inputError && <div>Please, enter title</div>}
        </div>
    );
};