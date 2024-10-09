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

export const TodoList = ({
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

    const updateTodoListTitleHandler = (newTitle: string) => {
        updateTodoListTitle(todoListId, newTitle)
    }

    const updateTaskTitleHandler = (taskId: string, newTitle: string) => {
        updateTaskTitle(todoListId, taskId, newTitle)
    }

    //условный рендеринг
    const tasksList = tasks.length === 0
        ? <p>Список пуст</p>
        : <List>
            {tasks.map((t: TaskType) => {
                const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(todoListId, t.id, e.currentTarget.checked)
                }

                // const updateTaskTitleHandler = (newTitle: string) => {
                //     updateTaskTitle(todoListId, t.id, newTitle)
                // }

                return <ListItem key={t.id} sx={getListItemSX(t.isDone)}>
                    <div>
                        <Checkbox onChange={changeStatusHandler} checked={t.isDone}/>
                        <EditableSpan oldTitle={t.title} updateTitle={(newTitle: string) => updateTaskTitleHandler(t.id, newTitle)}/>
                    </div>

                    <IconButton aria-label="delete" onClick={() => removeTask(todoListId, t.id)}>
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
        return () => changeFilter(todoListId, filter)
    }

    // const isAddTaskPossible = taskTitle.length && taskTitle.length <= 15

    const addTaskHandler = (title: string) => {
        addTask(todoListId, title)
    }

    return (
        <div className="todolist">
            <TodoListHeader title={title} removeTodoList={removeTodoList} todoListId={todoListId} updateTodoListTitle={updateTodoListTitleHandler}/>
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
                <Button variant={filter === 'all' ? 'contained' : 'outlined'} onClick={changeFilterHandlerCreator(todoListId, 'all')}>All</Button>
                <Button variant={filter === 'active' ? 'contained' : 'outlined'} onClick={changeFilterHandlerCreator(todoListId, 'active')}>Active</Button>
                <Button variant={filter === 'completed' ? 'contained' : 'outlined'} onClick={changeFilterHandlerCreator(todoListId, 'completed')}>Completed</Button>
            </Box>
        </div>
    );
};