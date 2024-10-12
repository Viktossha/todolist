import React, {useState} from 'react';
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

type ThemeMode = 'dark' | 'light'

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

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

    // let [todoLists, setTodoLists] = useState<TodoListType[]>([
    //     {id: v1(), title: 'What to learn', filter: 'all'},
    //     {id: v1(), title: 'What to buy', filter: 'active'},
    // ])

    // const [tasks, setTasks] = React.useState<TaskType[]>([
    //     {id: v1(), title: 'HTML', isDone: true},
    //     {id: v1(), title: 'CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: false},
    //     {id: v1(), title: 'REACT', isDone: false},
    // ]) //useState метод объекта React

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        { id: todoListID1, title: 'What to learn', filter: 'all' },
        { id: todoListID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState({
        [todoListID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todoListID2]: [
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Eggs', isDone: false },
        ],
    })

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (todoListId: string, taskId: string) => {
        const task = tasks[todoListId].filter(t => t.id !== taskId)
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
        // const updatedState = tasks.filter(t => t.id !== taskId)
        // setTasks(updatedState)

        // tasks.pop()
        // setTasks([...tasks])
    }

    const addTask = (todoListId: string, title: string) => {
        setTasks({...tasks, [todoListId]: [...tasks[todoListId], {id: v1(), title: title, isDone: false}]})
        // const newTask: TaskType = {id: v1(), title: title, isDone: false}
        // setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (todoListId: string, taskId: string, newIsDoneValue: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)})
        // const updatedState = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        // setTasks(updatedState)
    }

    const changeFilter = (todoListId: string, filterValue: FilterValuesType) => {
        // let currentTodoList = todoLists.find(l => l.id === todoListId)
        // if (currentTodoList) {
        //     currentTodoList.filter = filterValue
        //     setTodoLists([...todoLists])
        // }
       setTodoLists(todoLists.map(l => l.id === todoListId ? {...l, filter: filterValue} : l))
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

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(l => l.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        setTodoLists([{id: newTodoListId, title, filter: 'all'}, ...todoLists])
        setTasks({...tasks, [newTodoListId]: []})
    }

    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: newTitle}: el)})
    }

    const updateTodoListTitle = (todolistId: string, newTitle: string) => {
        setTodoLists(todoLists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
    }

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

                    const filteredTasks = getFilteredTasks(tasks[l.id], l.filter)

                    return (
                        <Grid item sx={{margin: '20px'}}>
                            <Paper elevation={3} sx={{padding: '20px'}}>
                                <TodoList
                                    key={l.id}
                                    todoListId={l.id}
                                    title={l.title}
                                    tasks={filteredTasks}
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

export default App;
