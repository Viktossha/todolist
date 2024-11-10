import React, {Reducer, useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {MenuButton} from "./MenuButton";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    ActionsType,
    addTodoListAC,
    changeFilterAC,
    removeTodoListAC,
    todolistsReducer, updateTodoListTitleAC
} from "./model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./model/store";
import {TodoListWithRedux} from "./TodoListWithRedux";

type ThemeMode = 'dark' | 'light'

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#0c70ab',
            },
        },
    })

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    let todoLists = useSelector<RootState, TodoListType[]>(state => state.todolists)
    let tasks = useSelector<RootState, TasksType>(state => state.tasks)

    let dispatch = useDispatch()

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(removeTaskAC(todoListId, taskId))
    }, [dispatch])

    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((todoListId: string, taskId: string, newIsDoneValue: boolean) => {
        dispatch(changeTaskStatusAC(todoListId, taskId, newIsDoneValue))
    }, [dispatch])

    const changeFilter = useCallback((todoListId: string, filterValue: FilterValuesType) => {
        dispatch(changeFilterAC(todoListId, filterValue))
    }, [dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])

    const updateTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }, [dispatch])

    const updateTodoListTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(updateTodoListTitleAC(todolistId, newTitle))
    }, [dispatch])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" sx={{marginBottom: '30px'}}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton background={theme.palette.primary.light}>Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler} />
                    </div>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container sx={{marginBottom: '30px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container>{todoLists.map(l => {

                    return (
                        <Grid item sx={{margin: '20px'}}>
                            <Paper elevation={3} sx={{padding: '20px'}}>
                                <TodoList
                                    key={l.id}
                                    todoListId={l.id}
                                    title={l.title}
                                    tasks={tasks[l.id]}
                                    filter={l.filter}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodoList={removeTodoList}
                                    updateTaskTitle={updateTaskTitle}
                                    updateTodoListTitle={updateTodoListTitle}
                                />
                            </Paper>
                        </Grid>)
                })}</Grid>

            </Container>
        </ThemeProvider>
    );
}

export default AppWithRedux;
