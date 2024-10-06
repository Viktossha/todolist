import React, {ChangeEvent, useRef, useState} from 'react';
import {Button} from "./Button";
import {TodoListHeader} from "./TodoListHeader";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = ({title, tasks, removeTask, changeFilter, addTask}: TodoListPropsType) => {
    // const title = props.title
    // const tasks = props.tasks
    // олдскульная запись

    // const {title, tasks} = props //деструктурирующее присваивание сокращенная запись, т.к. названия совпадают
    const taskTitleInput = useRef<HTMLInputElement>(null)

    //условный рендеринг
    const tasksList = tasks.length === 0
        ? <p>Список пуст</p>
        : <ul>
            {tasks.map((t: TaskType) => <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <Button title={'x'} onClickHandler={() => removeTask(t.id)}/>
            </li>)}
        </ul>

    const addNewTask = () => {
        if (taskTitleInput.current) {
            addTask(taskTitleInput.current.value)
            taskTitleInput.current.value = ''
        }
    }

    return (
        <div className="todolist">
            {/*<TodoListHeader title={title} removeTodoList={() => {}} todoListId={''}/>*/}
            <div>
                <input ref={taskTitleInput}/>
                <Button title={'+'} onClickHandler={addNewTask}/>
            </div>
            {tasksList}
            <div>
                <Button title={'All'} onClickHandler={() => changeFilter('all')}/>
                <Button title={'Active'} onClickHandler={() => changeFilter('active')}/>
                <Button title={'Completed'} onClickHandler={() => changeFilter('completed')}/>
            </div>
        </div>
    );
};