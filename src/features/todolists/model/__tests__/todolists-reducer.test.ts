import {
  addTodolist,
  type DomainTodolist,
  removeTodolist,
  todolistsReducer,
  updateTodolistFilter,
  updateTodolistTitle,
} from "../todolistsSlice"
import { v1 } from "uuid"

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: "", entityStatus: "idle" },
    { id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: "", entityStatus: "idle" },
  ]
})

test("correct todolist should be removed", () => {
  // 1. Стартовый state

  // 2. Действие
  // const action = {
  //     type: 'REMOVE-TODOLIST',
  //     payload: {
  //         id: todolistId1,
  //     },
  // } as const

  // const endState = todolistsReducer(startState, action)
  const endState = todolistsReducer(startState, removeTodolist({ id: todolistId1 }))

  // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
  // в массиве останется один тудулист
  expect(endState.length).toBe(1)
  // удалится нужный тудулист, а не любой
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  // const action = {
  //     type: 'ADD-TODOLIST',
  //     payload: {
  //         title: 'New Todolist',
  //     },
  // } as const

  const endState = todolistsReducer(
    startState,
    addTodolist({ todolist: { id: v1(), title: "New Todolist", order: 0, addedDate: "" } }),
  )

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe("New Todolist")
})

test("correct todolist should change its name", () => {
  // const action = {
  //     type: 'CHANGE-TODOLIST-TITLE',
  //     payload: {
  //         id: todolistId2,
  //         title: 'New Todolist',
  //     },
  // } as const
  const endState = todolistsReducer(startState, updateTodolistTitle({ id: todolistId2, title: "New Todolist" }))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe("New Todolist")
})

test("correct filter of todolist should be changed", () => {
  // const action = {
  //     type: 'CHANGE-TODOLIST-FILTER',
  //     payload: {
  //         id: todolistId2,
  //         filter: 'completed',
  //     },
  // } as const

  const endState = todolistsReducer(startState, updateTodolistFilter({ id: todolistId2, filter: "completed" }))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe("completed")
})
