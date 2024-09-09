import React from 'react';
import {Button} from "./Button";
import {TodoListHeader} from "./TodoListHeader";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const TodoList = ({title, tasks}: TodoListPropsType) => {
    // const title = props.title
    // const tasks = props.tasks
    // олдскульная запись

    // const {title, tasks} = props //деструктурирующее присваивание сокращенная запись, т.к. названия совпадают


    //условный рендеринг
    const tasksList = tasks.length === 0
        ? <p>Список пуст</p>
        : <ul>
            {tasks.map((t: TaskType) => <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
            </li>)}
        </ul>

    return (
        <div className="todolist">
            <TodoListHeader title={title}/>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {tasksList}
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    );
};