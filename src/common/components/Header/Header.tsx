import React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { MenuButton } from "common/components"
import Switch from "@mui/material/Switch"
import { getTheme } from "common/theme"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { LinearProgress } from "@mui/material"
import {
  changeTheme,
  selectAppStatus,
  selectIsLoggedIn,
  selectThemeMode,
  setAppStatus,
  setIsLoggedIn,
} from "../../../app/appSlice"
import { useLogoutMutation } from "../../../features/auth/api/authApi"
import { ResultCode } from "common/enums/enums"
import { clearTasks } from "../../../features/todolists/model/tasksSlice"
import { clearTodolist } from "../../../features/todolists/model/todolistsSlice"

export const Header = () => {
  let themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const theme = getTheme(themeMode)
  let dispatch = useAppDispatch()

  const [logout] = useLogoutMutation()

  const changeModeHandler = () => {
    //setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    dispatch(changeTheme({ theme: themeMode == "light" ? "dark" : "light" }))
  }

  const logoutHandler = () => {
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        localStorage.removeItem("sn-token")
        dispatch(clearTasks())
        dispatch(clearTodolist())
      }
    })
  }

  return (
    <AppBar position="static" sx={{ marginBottom: "30px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
          <MenuButton background={theme.palette.primary.light}>Faq</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
