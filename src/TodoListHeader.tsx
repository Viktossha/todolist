import React from 'react';
import {Button} from "./Button";

type TodoListHeaderPropsType = {
    todoListId: string
    title: string
    removeTodoList: (todoListId: string) => void
}
export const TodoListHeader = (props: TodoListHeaderPropsType) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
            <h3 style={{margin: '0'}}>{props.title}</h3>
            <Button title={'x'} onClickHandler={() => props.removeTodoList(props.todoListId)}/>
        </div>
    );
};