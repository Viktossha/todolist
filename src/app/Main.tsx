import React, { useCallback, useEffect } from "react"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { AddItemForm } from "common/components"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { addTodoListAC, addTodolistTC } from "../features/todolists/model/todolists-reducer"
import { useAppDispatch, useAppSelector } from "./hooks"
import { useNavigate } from "react-router"
import { Path } from "common/routing"
import { selectIsLoggedIn } from "../features/auth/model/auth-selector"

export const Main = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  let dispatch = useAppDispatch()

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title))
    },
    [dispatch],
  )
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
