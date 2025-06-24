import React, { useEffect } from "react"
import List from "@mui/material/List"
import { Task } from "./Task/Task"
import { FilterValuesType } from "../../../../../../app/App"
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks"
import type { DomainTodolist } from "../../../../model/todolistsSlice"
import { fetchTasksTC, selectTasks } from "../../../../model/tasksSlice"
import type { DomainTask } from "../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../lib/enums"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  let tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [])

  const getFilteredTasks = (allTasks: DomainTask[], currentFilter: FilterValuesType): DomainTask[] => {
    switch (currentFilter) {
      case "active":
        return allTasks.filter((t) => t.status === TaskStatus.New)
      case "completed":
        return allTasks.filter((t) => t.status === TaskStatus.Completed)
      default:
        return allTasks
    }
  }

  const tasksForTodolists = getFilteredTasks(tasks[todolist.id], todolist.filter)

  return (
    <>
      {tasksForTodolists?.length === 0 ? (
        <p>Список пуст</p>
      ) : (
        <List>
          {tasksForTodolists?.map((t: DomainTask) => {
            return <Task key={t.id} task={t} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
