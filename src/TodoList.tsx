import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {Button} from "./Button";
import {TodoListHeader} from "./TodoListHeader";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = ({
                             title,
                             tasks,
                             filter,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus
                         }: TodoListPropsType) => {
    // const title = props.title
    // const tasks = props.tasks
    // олдскульная запись

    // const {title, tasks} = props //деструктурирующее присваивание сокращенная запись, т.к. названия совпадают
    const [taskTitle, setTaskTitle] = useState('')
    const [inputError, setInputError] = useState<boolean>(false)

    //условный рендеринг
    const tasksList = tasks.length === 0
        ? <p>Список пуст</p>
        : <ul>
            {tasks.map((t: TaskType) => {
                const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(t.id, e.currentTarget.checked)
                }
                return <li key={t.id}><input type="checkbox"
                                             onChange={changeStatusHandler}
                                             checked={t.isDone}/>
                    <span className={t.isDone ? 'task-done' : 'task'}>{t.title}</span>
                    <Button title={'x'} onClickHandler={() => removeTask(t.id)}/>
                </li>
            })}
        </ul>

    const addNewTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            addTask(trimmedTaskTitle)
        } else {
            setInputError(true)
        }
        setTaskTitle('')
    }

    const onKeyDownAddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && isAddTaskPossible) {
            addNewTaskHandler()
        }
    }

    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(false)
        setTaskTitle(e.currentTarget.value)
    }

    const changeFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => changeFilter(filter)
    }

    const isAddTaskPossible = taskTitle.length && taskTitle.length <= 15

    return (
        <div className="todolist">
            <TodoListHeader title={title}/>
            <div>
                <input value={taskTitle}
                       className={inputError ? 'input-error' : ''}
                       onChange={setTaskTitleHandler}
                       onKeyDown={onKeyDownAddNewTaskHandler}/>
                <Button title={'+'} onClickHandler={addNewTaskHandler} isDisabled={!isAddTaskPossible}/>
                {taskTitle.length > 15 && <div>Task title is long</div>}
                {inputError && <div>Please, enter title</div>}
            </div>
            {tasksList}
            <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                <Button title={'All'}
                        classes={filter === 'all' ? 'btn-active' : ''}
                        onClickHandler={changeFilterHandlerCreator('all')}/>
                <Button title={'Active'}
                        classes={filter === 'active' ? 'btn-active' : ''}
                        onClickHandler={changeFilterHandlerCreator('active')}/>
                <Button title={'Completed'}
                        classes={filter === 'completed' ? 'btn-active' : ''}
                        onClickHandler={changeFilterHandlerCreator('completed')}/>
            </div>
        </div>
    );
};