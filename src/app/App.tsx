import React from "react"
import "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "common/theme"
import { Header } from "common/components"
import { Main } from "./Main"
import { useAppSelector } from "./hooks"
import { selectThemeMode } from "./app-selectors"
import type { DomainTask } from "../features/todolists/api/tasksApi.types"

type ThemeMode = "dark" | "light"

export type FilterValuesType = "all" | "active" | "completed"

// export type TodoListType = {
//   id: string
//   title: string
//   filter: FilterValuesType
// }

export type TasksType = {
  [key: string]: DomainTask[]
}

function App() {
  let themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}

export default App
