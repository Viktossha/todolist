import React from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodoList } from "./Todolist/TodoList"
import { useGetTodolistsQuery } from "../../api/todolistsApi"

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery()

  return (
    <>
      {todolists?.map((l) => {
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
