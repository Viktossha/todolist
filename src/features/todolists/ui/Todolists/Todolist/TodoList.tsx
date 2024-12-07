import React, {useCallback} from 'react';
// import {Button} from "./Button";
import {TodoListHeader} from "./TodoListHeader/TodoListHeader";
import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {TodoListType} from "../../../../../app/App";
import {Tasks} from "./Tasks/Tasks";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {addTaskAC} from "../../../model/tasks-reducer";
import {useAppDispatch} from "../../../../../app/hooks";

type TodoListPropsType = {
    todolist: TodoListType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = React.memo(({todolist}: TodoListPropsType) => {

    let dispatch = useAppDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(todolist.id, title))
    }, [dispatch])

    return (
        <div className="todolist">
            <TodoListHeader todolist={todolist}/>
            <AddItemForm addItem={addTask}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    );
});