import { addTodoListAC, type DomainTodolist, todolistsReducer } from "../todolists-reducer"
import { tasksReducer } from "../tasks-reducer"
import type { TasksType } from "../../../../app/App"

test("ids should be equals", () => {
  const startTasksState: TasksType = {}
  const startTodolistsState: DomainTodolist[] = []

  const action = addTodoListAC("new todolist")

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolistId)
  expect(idFromTodolists).toBe(action.payload.todolistId)
})
