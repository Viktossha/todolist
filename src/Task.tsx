import React, {ChangeEvent} from 'react';
import ListItem from "@mui/material/ListItem";
import {getListItemSX} from "./Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./TodoListWithRedux";

type TaskPropsType = {
    task: TaskType
    todoListId: string
    changeTaskStatus: (todoListId: string, taskId: string, newIsDoneValue: boolean) => void
    updateTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTask: (todoListId: string, taskId: string) => void
}

export const Task = React.memo(({task, changeTaskStatus, removeTask, updateTaskTitle, todoListId}: TaskPropsType) => {
    console.log('Task')
    const updateTaskTitleHandler = (taskId: string, newTitle: string) => {
        updateTaskTitle(todoListId, taskId, newTitle)
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todoListId, task.id, e.currentTarget.checked)
    }

    const updateTitleHandler = (newTitle: string) => {
        updateTaskTitleHandler(task.id, newTitle)
    }

    return <ListItem sx={getListItemSX(task.isDone)}>
        <div>
            <Checkbox onChange={changeStatusHandler} checked={task.isDone}/>
            <EditableSpan oldTitle={task.title}
                          updateTitle={updateTitleHandler}/>
        </div>

        <IconButton aria-label="delete" onClick={() => removeTask(todoListId, task.id)}>
            <DeleteIcon/>
        </IconButton>
    </ListItem>
});