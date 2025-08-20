import React, { useState } from "react"
import List from "@mui/material/List"
import { Task } from "./Task/Task"
import type { DomainTask } from "../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../lib/enums"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import { DomainTodolist, FilterValues } from "../../../../lib/types/types"
import { TasksPagination } from "../TasksPagination/TasksPagination"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetTasksQuery({ todolistId: todolist.id, args: { page } })

  const getFilteredTasks = (allTasks: DomainTask[] = [], currentFilter: FilterValues): DomainTask[] => {
    switch (currentFilter) {
      case "active":
        return allTasks.filter((t) => t.status === TaskStatus.New)
      case "completed":
        return allTasks.filter((t) => t.status === TaskStatus.Completed)
      default:
        return allTasks
    }
  }

  const tasksForTodolists = getFilteredTasks(data?.items, todolist.filter)

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {tasksForTodolists?.length === 0 ? (
        <p>Список пуст</p>
      ) : (
        <>
          <List>
            {tasksForTodolists?.map((t: DomainTask) => {
              return <Task key={t.id} task={t} todolist={todolist} />
            })}
          </List>
          <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
        </>
      )}
    </>
  )
}
