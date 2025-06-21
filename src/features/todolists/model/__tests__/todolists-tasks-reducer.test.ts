import { addTodoListAC, type DomainTodolist, todolistsReducer } from "../todolistsSlice"
import { tasksReducer } from "../tasks-reducer"
import type { TasksType } from "../../../../app/App"
import { v1 } from "uuid"

test("ids should be equals", () => {
  const startTasksState: TasksType = {}
  const startTodolistsState: DomainTodolist[] = []

  const action = addTodoListAC({ id: v1(), title: "new todolist", order: 0, addedDate: "" })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
