import React from "react";
import {FilterValuesType} from "./App";
import {Button} from "./Button";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: number) => void,
    changeFilter: (value: FilterValuesType) => void
}

export const  Todolist: React.FC<TodolistPropsType> = ({title, tasks, removeTask, changeFilter}) => {

    const tasksItem: JSX.Element = tasks.length !== 0
        ?
            <ul>
                {tasks.map(t => <li><input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button title={'x'} onClickHandler={() => removeTask(t.id)}/>
                        {/*<button onClick={() => {removeTask(t.id)}}>x</button>*/}
                    </li>
                )}
            </ul>
        :
            <span>ПОКА</span>


    return <div className='todolist'>
        <h3>{title}</h3>
        <div>
            <input/>
            <Button title={'+'} onClickHandler={() => {}}/>
        </div>
            {tasksItem}
        <div>
            <Button title={'All'} onClickHandler={() => changeFilter('all')}/>
            <Button title={'Active'} onClickHandler={() => changeFilter('active')}/>
            <Button title={'Completed'} onClickHandler={() =>  changeFilter('completed')}/>
            {/*<button onClick={() => {changeFilter('all')}}>All</button>*/}
            {/*<button onClick={() => {changeFilter('active')}}>Active</button>*/}
            {/*<button onClick={() => {changeFilter('completed')}}>Completed</button>*/}
        </div>
    </div>
}