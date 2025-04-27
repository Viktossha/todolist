import React, {ChangeEvent, useCallback} from 'react';
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "common/components";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodoListType} from "app/App";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../../../model/tasks-reducer";
import {useAppDispatch} from "../../../../../../../app/hooks";
import type {TaskType} from "../../TodoList";
import {getListItemSX} from "./Task.styles";

type TaskPropsType = {
    task: TaskType
    todolist: TodoListType
}

export const Task = React.memo(({task, todolist}: TaskPropsType) => {

    let dispatch = useAppDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(todolist.id, task.id))
    }, [dispatch])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(todolist.id, task.id, newIsDoneValue))
    }, [dispatch])

    const updateTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(todolist.id, task.id, newTitle))
    }, [dispatch])

    return <ListItem sx={getListItemSX(task.isDone)}>
        <div>
            <Checkbox onChange={changeTaskStatus} checked={task.isDone}/>
            <EditableSpan oldTitle={task.title}
                          updateTitle={updateTaskTitle}/>
        </div>

        <IconButton aria-label="delete" onClick={removeTask}>
            <DeleteIcon/>
        </IconButton>
    </ListItem>
});