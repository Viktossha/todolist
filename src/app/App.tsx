import React, { useEffect } from "react"
import "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "common/theme"
import { ErrorSnackbar, Header } from "common/components"
import { useAppDispatch, useAppSelector } from "./hooks"
import { Routing } from "common/routing"
import { initializeAppTC, selectIsInitialized } from "../features/auth/model/authSlice"
import { CircularProgress } from "@mui/material"
import s from "./App.module.css"
import { selectThemeMode } from "./appSlice"

type ThemeMode = "dark" | "light"

export type FilterValuesType = "all" | "active" | "completed"

function App() {
  let themeMode = useAppSelector(selectThemeMode)
  const isInitialized = useAppSelector(selectIsInitialized)

  const theme = getTheme(themeMode)
  let dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}

export default App
