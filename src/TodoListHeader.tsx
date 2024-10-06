import React from 'react';
import {Button} from "./Button";
import {EditableSpan} from "./EditableSpan";

type TodoListHeaderPropsType = {
    todoListId: string
    title: string
    removeTodoList: (todoListId: string) => void
    updateTodoListTitle: (newTitle: string) => void
}
export const TodoListHeader = (props: TodoListHeaderPropsType) => {

    const updateTodoListTitleHandler = (newTitle: string) => {
        props.updateTodoListTitle(newTitle)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
            {/*<h3 style={{margin: '0'}}>{props.title}</h3>*/}
            <EditableSpan className={'todolist-title'} oldTitle={props.title} updateTitle={updateTodoListTitleHandler}/>
            <Button title={'x'} onClickHandler={() => props.removeTodoList(props.todoListId)}/>
        </div>
    );
};