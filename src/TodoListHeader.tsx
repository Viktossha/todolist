import React from 'react';
import {Button} from "./Button";

type TodoListHeaderPropsType = {
    title: string
}
export const TodoListHeader = (props: TodoListHeaderPropsType) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
            <h3 style={{margin: '0'}}>{props.title}</h3>
            <Button title={'x'}/>
        </div>
    );
};