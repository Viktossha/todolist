import { addTodolist, type DomainTodolist, todolistsReducer } from "../todolistsSlice"
import { tasksReducer, type TasksType } from "../tasksSlice"
import type {} from "../../../../app/App"
import { v1 } from "uuid"

test("ids should be equals", () => {
  const startTasksState: TasksType = {}
  const startTodolistsState: DomainTodolist[] = []

  const action = addTodolist({ todolist: { id: v1(), title: "new todolist", order: 0, addedDate: "" } })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
