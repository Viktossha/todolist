import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
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
    const [taskTitle, setTaskTitle] = useState('')

    //условный рендеринг
    const tasksList = tasks.length === 0
        ? <p>Список пуст</p>
        : <ul>
            {tasks.map((t: TaskType) => <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <Button title={'x'} onClickHandler={() => removeTask(t.id)}/>
            </li>)}
        </ul>

    const addNewTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }

    const onKeyDownAddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && isAddTaskPossible) {
            addNewTaskHandler()
        }
    }

    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const changeFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => changeFilter(filter)
    }

    const isAddTaskPossible = taskTitle.length && taskTitle.length <= 15

    return (
        <div className="todolist">
            <TodoListHeader title={title}/>
            <div>
                <input value={taskTitle}
                       onChange={setTaskTitleHandler}
                       onKeyDown={onKeyDownAddNewTaskHandler}/>
                <Button title={'+'} onClickHandler={addNewTaskHandler} isDisabled={!isAddTaskPossible}/>
                {taskTitle.length > 15 && <div>Task title is long</div>}
            </div>
            {tasksList}
            <div>
                <Button title={'All'} onClickHandler={changeFilterHandlerCreator('all')}/>
                <Button title={'Active'} onClickHandler={changeFilterHandlerCreator('active')}/>
                <Button title={'Completed'} onClickHandler={changeFilterHandlerCreator('completed')}/>
            </div>
        </div>
    );
};