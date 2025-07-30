import React, { useEffect, useState } from "react"
import "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "common/theme"
import { ErrorSnackbar, Header } from "common/components"
import { useAppDispatch, useAppSelector } from "./hooks"
import { Routing } from "common/routing"
import { CircularProgress } from "@mui/material"
import s from "./App.module.css"
import { selectThemeMode, setIsLoggedIn } from "./appSlice"
import { useMeQuery } from "../features/auth/api/authApi"
import { ResultCode } from "common/enums/enums"

type ThemeMode = "dark" | "light"

export type FilterValuesType = "all" | "active" | "completed"

function App() {
  let themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()

  const [isInitialized, setIsInitialized] = useState(false)

  const { data, isLoading } = useMeQuery()

  const theme = getTheme(themeMode)

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    }
  }, [isLoading, data])

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
