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
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const  Todolist: React.FC<TodolistPropsType> = ({title, tasks, removeTask, changeFilter, addTask, changeStatus, filter}) => {

    const [NewTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addNewTask = () => {
        if (NewTaskTitle.trim() !== '') {
            addTask(NewTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required')
        }
    }

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(e.code === "Enter" && NewTaskTitle.trim() !== '') {
            addTask(NewTaskTitle);
            //setNewTaskTitle('');
        }
    }

    const changeFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => changeFilter(filter)
    }

    const tasksItem: JSX.Element = tasks.length !== 0
        ?
            <ul>
                {tasks.map(t => {
                        const onRemoveHandler = () => removeTask(t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeStatus(t.id, e.currentTarget.checked)


                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}><input type="checkbox" onChange={onChangeHandler} checked={t.isDone} />
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
            <input value={NewTaskTitle} onChange={onNewTitleChangeHandler} onKeyPress={onKeyPressHandler} className={error ? 'error' : ''}/>
            <Button title={'+'} onClickHandler={addNewTask} isDisabled={!NewTaskTitle}/>
            {error && <div className='error-message'>Field is required</div>}
        </div>
            {tasksItem}
        <div>
            <Button class={filter === 'all' ? 'active-filter' : ''} title={'All'} onClickHandler={changeFilterHandlerCreator("all")}/>
            <Button class={filter === 'active' ? 'active-filter' : ''} title={'Active'} onClickHandler={changeFilterHandlerCreator("active")}/>
            <Button class={filter === 'completed' ? 'active-filter' : ''} title={'Completed'} onClickHandler={changeFilterHandlerCreator("completed")}/>
            {/*<button onClick={() => {changeFilter('all')}}>All</button>*/}
            {/*<button onClick={() => {changeFilter('active')}}>Active</button>*/}
            {/*<button onClick={() => {changeFilter('completed')}}>Completed</button>*/}
        </div>
    </div>
}