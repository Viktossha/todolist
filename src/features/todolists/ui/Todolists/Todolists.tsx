import React, { useEffect } from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodoList } from "./Todolist/TodoList"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { selectTodolists } from "../../model/todolists-selectors"
import { fetchTodolistsTC } from "../../model/todolistsSlice"

export const Todolists = () => {
  let todoLists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todoLists.map((l) => {
        return (
          <Grid key={l.id} item sx={{ margin: "20px" }}>
            <Paper elevation={3} sx={{ padding: "20px" }}>
              <TodoList todolist={l} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
