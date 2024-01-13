import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./Button";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export const  Todolist: React.FC<TodolistPropsType> = ({title, tasks, removeTask, changeFilter, addTask}) => {

    const [NewTaskTitle, setNewTaskTitle] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.ctrlKey && e.charCode === 13) {addTask(NewTaskTitle); setNewTaskTitle('')}
    }

    const addNewTask = () => {
        addTask(NewTaskTitle); setNewTaskTitle('')
    }

    const onAllClickHandler = () => changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const onCompletedClickHandler = () => changeFilter('completed')

    const tasksItem: JSX.Element = tasks.length !== 0
        ?
            <ul>
                {tasks.map(t => {
                        const onRemoveHandler = () => removeTask(t.id)

                        return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button title={'x'} onClickHandler={onRemoveHandler}/>
                            {/*<button onClick={() => {removeTask(t.id)}}>x</button>*/}
                        </li>
                    }
                )}
            </ul>
        :
            <span>ПОКА</span>


    return <div className='todolist'>
        <h3>{title}</h3>
        <div>
            <input value={NewTaskTitle} onChange={onNewTitleChangeHandler} onKeyPress={onKeyPressHandler}/>
            <Button title={'+'} onClickHandler={addNewTask}/>
        </div>
            {tasksItem}
        <div>
            <Button title={'All'} onClickHandler={onAllClickHandler}/>
            <Button title={'Active'} onClickHandler={onActiveClickHandler}/>
            <Button title={'Completed'} onClickHandler={onCompletedClickHandler}/>
            {/*<button onClick={() => {changeFilter('all')}}>All</button>*/}
            {/*<button onClick={() => {changeFilter('active')}}>Active</button>*/}
            {/*<button onClick={() => {changeFilter('completed')}}>Completed</button>*/}
        </div>
    </div>
}