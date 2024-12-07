import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {MenuButton} from "../MenuButton/MenuButton";
import Switch from "@mui/material/Switch";
import {getTheme} from "../../theme";
import {ChangeThemeAC} from "../../../app/app-reducer";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectThemeMode} from "../../../app/app-selectors";

export const Header = () => {

    let themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)
    let dispatch = useAppDispatch()

    const changeModeHandler = () => {
        //setThemeMode(themeMode == 'light' ? 'dark' : 'light')
        dispatch(ChangeThemeAC(themeMode == 'light' ? 'dark' : 'light'))
    }

    return (
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
    );
};