import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {Button} from "./Button";
import {TodoListHeader} from "./TodoListHeader";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, filterValue: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, newIsDoneValue: boolean) => void
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = ({
                             todoListId,
                             title,
                             tasks,
                             filter,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             removeTodoList
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
                    changeTaskStatus(todoListId, t.id, e.currentTarget.checked)
                }
                return <li key={t.id}><input type="checkbox"
                                             onChange={changeStatusHandler}
                                             checked={t.isDone}/>
                    <span className={t.isDone ? 'task-done' : 'task'}>{t.title}</span>
                    <Button title={'x'} onClickHandler={() => removeTask(todoListId, t.id)}/>
                </li>
            })}
        </ul>

    const addNewTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            addTask(todoListId ,trimmedTaskTitle)
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

    const changeFilterHandlerCreator = (todoListId: string, filter: FilterValuesType) => {
        return () => changeFilter(todoListId, filter)
    }

    const isAddTaskPossible = taskTitle.length && taskTitle.length <= 15

    return (
        <div className="todolist">
            <TodoListHeader title={title} removeTodoList={removeTodoList} todoListId={todoListId}/>
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
                        onClickHandler={changeFilterHandlerCreator(todoListId, 'all')}/>
                <Button title={'Active'}
                        classes={filter === 'active' ? 'btn-active' : ''}
                        onClickHandler={changeFilterHandlerCreator(todoListId, 'active')}/>
                <Button title={'Completed'}
                        classes={filter === 'completed' ? 'btn-active' : ''}
                        onClickHandler={changeFilterHandlerCreator(todoListId, 'completed')}/>
            </div>
        </div>
    );
};