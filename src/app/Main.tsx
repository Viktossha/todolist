import React, { useCallback, useEffect } from "react"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { AddItemForm } from "common/components"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { addTodolistTC } from "../features/todolists/model/todolistsSlice"
import { useAppDispatch, useAppSelector } from "./hooks"
import { useNavigate } from "react-router"
import { Path } from "common/routing"
import { selectIsLoggedIn } from "../features/auth/model/authSlice"
import { useCreateTodolistMutation } from "../features/todolists/api/todolistsApi"

export const Main = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [createTodolist] = useCreateTodolistMutation()

  const addTodoList = (title: string) => {
    createTodolist(title)
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login)
    }
  }, [isLoggedIn])

  return (
    <Container fixed>
      <Grid container sx={{ marginBottom: "30px" }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>

      <Grid container>
        <Todolists />
      </Grid>
    </Container>
  )
}
