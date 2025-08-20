import React, { useCallback } from "react"
import Box from "@mui/material/Box"
import Button, { ButtonProps } from "@mui/material/Button"
import { useAppDispatch } from "../../../../../../app/hooks"
import { filterButtonsContainerSx } from "./FilterTasksButtons.styles"
import { todolistsApi } from "../../../../api/todolistsApi"
import { DomainTodolist, FilterValues } from "../../../../lib/types/types"

type Props = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  let dispatch = useAppDispatch()

  const changeFilter = useCallback(
    (todoListId: string, filterValue: FilterValues) => {
      dispatch(
        todolistsApi.util.updateQueryData("getTodolists", undefined, (todolists) => {
          const todolist = todolists.find((todo) => todo.id === todoListId)
          if (todolist) todolist.filter = filterValue
        }),
      )
    },
    [dispatch],
  )

  const changeFilterHandlerCreator = useCallback(
    (todoListId: string, filter: FilterValues) => {
      return () => changeFilter(todoListId, filter)
    },
    [changeFilter, todolist.id],
  )

  return (
    <Box sx={filterButtonsContainerSx}>
      <MyButton
        variant={todolist.filter === "all" ? "contained" : "outlined"}
        onClick={changeFilterHandlerCreator(todolist.id, "all")}
        title={"All"}
      />
      <MyButton
        variant={todolist.filter === "active" ? "contained" : "outlined"}
        onClick={changeFilterHandlerCreator(todolist.id, "active")}
        title={"Active"}
      />
      <MyButton
        variant={todolist.filter === "completed" ? "contained" : "outlined"}
        onClick={changeFilterHandlerCreator(todolist.id, "completed")}
        title={"Completed"}
      />
    </Box>
  )
}

type myButtonPropsType = {} & ButtonProps

const MyButton = React.memo(({ variant, title, onClick, ...rest }: myButtonPropsType) => {
  //console.log('btn')
  return (
    <Button variant={variant} onClick={onClick} {...rest}>
      {title}
    </Button>
  )
})
