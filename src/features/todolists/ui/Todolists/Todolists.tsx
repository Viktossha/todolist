import React from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodoList } from "./Todolist/TodoList"
import { useGetTodolistsQuery } from "../../api/todolistsApi"
import { TodolistSkeleton } from "../skeletons/TodolistSkeleton/TodolistSkeleton"

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </div>
    )
  }

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
