import React, {ChangeEvent, KeyboardEvent, useCallback, useRef, useState} from 'react';
// import {Button} from "./Button";
import {TodoListHeader} from "./TodoListHeader";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button, {ButtonProps} from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {filterButtonsContainerSx, getListItemSX} from "./Todolist.styles";
import {Task} from "./Task";

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
    updateTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodoListTitle: (todolistId: string, newTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = React.memo(({
                             todoListId,
                             title,
                             tasks,
                             filter,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             removeTodoList,
                             updateTaskTitle,
                             updateTodoListTitle
                         }: TodoListPropsType) => {
    // const title = props.title
    // const tasks = props.tasks
    // олдскульная запись

    // const {title, tasks} = props //деструктурирующее присваивание сокращенная запись, т.к. названия совпадают
    // const [taskTitle, setTaskTitle] = useState('')
    // const [inputError, setInputError] = useState<boolean>(false)

    //console.log('Todolist')
    const updateTodoListTitleHandler = useCallback((newTitle: string) => {
        updateTodoListTitle(todoListId, newTitle)
    }, [updateTodoListTitle, todoListId])

    const getFilteredTasks = (allTasks: TaskType[], currentFilter: FilterValuesType): TaskType[] => {
        switch (currentFilter) {
            case "active":
                return allTasks.filter(t => !t.isDone)
            case "completed":
                return allTasks.filter(t => t.isDone)
            default:
                return allTasks
        }
    }

    tasks = getFilteredTasks(tasks, filter)

    //условный рендеринг
    const tasksList = tasks.length === 0
        ? <p>Список пуст</p>
        : <List>
            {tasks.map((t: TaskType) => {
                return <Task key={t.id} task={t} todoListId={todoListId} removeTask={removeTask} changeTaskStatus={changeTaskStatus} updateTaskTitle={updateTaskTitle}/>
            })}
        </List>

    const changeFilterHandlerCreator = useCallback((todoListId: string, filter: FilterValuesType) => {
        return () => changeFilter(todoListId, filter)
    }, [changeFilter, todoListId])

    // const isAddTaskPossible = taskTitle.length && taskTitle.length <= 15

    const addTaskHandler = useCallback((title: string) => {
        addTask(todoListId, title)
    }, [addTask, todoListId])

    return (
        <div className="todolist">
            <TodoListHeader title={title} removeTodoList={removeTodoList} todoListId={todoListId}
                            updateTodoListTitle={updateTodoListTitleHandler}/>
            <AddItemForm addItem={addTaskHandler}/>
            {/*<div>*/}
            {/*    <input value={taskTitle}*/}
            {/*           className={inputError ? 'input-error' : ''}*/}
            {/*           onChange={setTaskTitleHandler}*/}
            {/*           onKeyDown={onKeyDownAddNewTaskHandler}/>*/}
            {/*    <Button title={'+'} onClickHandler={addNewTaskHandler} isDisabled={!isAddTaskPossible}/>*/}
            {/*    {taskTitle.length > 15 && <div>Task title is long</div>}*/}
            {/*    {inputError && <div>Please, enter title</div>}*/}
            {/*</div>*/}
            {tasksList}
            <Box sx={filterButtonsContainerSx}>
                <MyButton variant={filter === 'all' ? 'contained' : 'outlined'}
                          onClick={changeFilterHandlerCreator(todoListId, 'all')} title={'All'}/>
                <MyButton variant={filter === 'active' ? 'contained' : 'outlined'}
                          onClick={changeFilterHandlerCreator(todoListId, 'active')} title={'Active'}/>
                <MyButton variant={filter === 'completed' ? 'contained' : 'outlined'}
                          onClick={changeFilterHandlerCreator(todoListId, 'completed')} title={'Completed'}/>
            </Box>
        </div>
    );
});

type myButtonPropsType = {} & ButtonProps

const MyButton = React.memo(({variant, title, onClick, ...rest}: myButtonPropsType) => {
    //console.log('btn')
    return <Button variant={variant} onClick={onClick} {...rest}>{title}</Button>
})