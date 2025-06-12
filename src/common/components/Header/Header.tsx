import React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { MenuButton } from "common/components"
import Switch from "@mui/material/Switch"
import { getTheme } from "common/theme"
import { ChangeThemeAC } from "../../../app/app-reducer"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectAppStatus, selectThemeMode } from "../../../app/app-selectors"
import { LinearProgress } from "@mui/material"
import { selectIsLoggedIn } from "../../../features/auth/model/auth-selector"
import { logoutTC } from "../../../features/auth/model/auth-reducer"

export const Header = () => {
  let themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const theme = getTheme(themeMode)
  let dispatch = useAppDispatch()

  const changeModeHandler = () => {
    //setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    dispatch(ChangeThemeAC(themeMode == "light" ? "dark" : "light"))
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
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
