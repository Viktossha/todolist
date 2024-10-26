import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
// import {Button} from "./Button";
import {TodoListHeader} from "./TodoListHeader";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {filterButtonsContainerSx, getListItemSX} from "./Todolist.styles";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./model/store";
import {TodoListType} from "./AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./model/tasks-reducer";
import {changeFilterAC, updateTodoListTitleAC} from "./model/todolists-reducer";

type TodoListPropsType = {
    todoList: TodoListType
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoListWithRedux = ({todoList, removeTodoList}: TodoListPropsType) => {

    const {id, title, filter} = todoList

    // let todoList = useSelector<RootState, TodoListType>(state => state.todolists.find(todo => todo.id === todoListId) as TodoListType)

    let tasks = useSelector<RootState, TaskType[]>(state => state.tasks[id])

    let dispatch = useDispatch()

    const updateTodoListTitleHandler = (newTitle: string) => {
        dispatch(updateTodoListTitleAC(id, newTitle))
    }

    const updateTaskTitleHandler = (taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(id, taskId, newTitle))
    }

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
                const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    dispatch(changeTaskStatusAC(id, t.id, e.currentTarget.checked))
                }

                // const updateTaskTitleHandler = (newTitle: string) => {
                //     updateTaskTitle(todoListId, t.id, newTitle)
                // }

                return <ListItem key={t.id} sx={getListItemSX(t.isDone)}>
                    <div>
                        <Checkbox onChange={changeStatusHandler} checked={t.isDone}/>
                        <EditableSpan oldTitle={t.title} updateTitle={(newTitle: string) => updateTaskTitleHandler(t.id, newTitle)}/>
                    </div>

                    <IconButton aria-label="delete" onClick={() => dispatch(removeTaskAC(id, t.id))}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            })}
        </List>

    // const addNewTaskHandler = () => {
    //     const trimmedTaskTitle = taskTitle.trim()
    //     if (trimmedTaskTitle) {
    //         addTask(todoListId ,trimmedTaskTitle)
    //     } else {
    //         setInputError(true)
    //     }
    //     setTaskTitle('')
    // }

    // const onKeyDownAddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter' && isAddTaskPossible) {
    //         addNewTaskHandler()
    //     }
    // }

    // const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     inputError && setInputError(false)
    //     setTaskTitle(e.currentTarget.value)
    // }

    const changeFilterHandlerCreator = (todoListId: string, filter: FilterValuesType) => {
        return () => dispatch(changeFilterAC(todoListId, filter))
    }

    // const isAddTaskPossible = taskTitle.length && taskTitle.length <= 15

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(id, title))
    }

    return (
        <div className="todolist">
            <TodoListHeader title={title} removeTodoList={removeTodoList} todoListId={id} updateTodoListTitle={updateTodoListTitleHandler}/>
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
                <Button variant={filter === 'all' ? 'contained' : 'outlined'} onClick={changeFilterHandlerCreator(id, 'all')}>All</Button>
                <Button variant={filter === 'active' ? 'contained' : 'outlined'} onClick={changeFilterHandlerCreator(id, 'active')}>Active</Button>
                <Button variant={filter === 'completed' ? 'contained' : 'outlined'} onClick={changeFilterHandlerCreator(id, 'completed')}>Completed</Button>
            </Box>
        </div>
    );
};