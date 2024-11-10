import React, {useCallback} from 'react';
import {Button} from "./Button";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

type TodoListHeaderPropsType = {
    todoListId: string
    title: string
    removeTodoList: (todoListId: string) => void
    updateTodoListTitle: (newTitle: string) => void
}
export const TodoListHeader = (props: TodoListHeaderPropsType) => {

    const updateTodoListTitleHandler = useCallback((newTitle: string) => {
        props.updateTodoListTitle(newTitle)
    }, [props.updateTodoListTitle])

    return (
        <div>
            <EditableSpan className={'todolist-title'} oldTitle={props.title} updateTitle={updateTodoListTitleHandler}/>
            <IconButton aria-label="delete" onClick={() => props.removeTodoList(props.todoListId)}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};