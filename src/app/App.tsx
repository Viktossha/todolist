import React from 'react';
import './App.css';
import {TaskType} from "../features/todolists/ui/Todolists/Todolist/TodoList";
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {getTheme} from "../common/theme/theme";
import {Header} from "../common/components/Header/Header";
import {Main} from "./Main";
import {useAppSelector} from "./hooks";
import {selectThemeMode} from "./app-selectors";

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

function App() {

    let themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header/>
            <Main/>
        </ThemeProvider>
    );
}

export default App;
