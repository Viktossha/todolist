import { addTaskAC, removeTaskAC, tasksReducer, updateTaskAC, updateTaskTC } from "../tasks-reducer"
import { addTodoListAC, removeTodoListAC } from "../todolists-reducer"
import type { TasksType } from "../../../../app/App"
import { TaskStatus } from "../../lib/enums"

let startState: TasksType
beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        deadline: "",
        startDate: "",
        addedDate: "",
        priority: 0,
        order: 0,
        description: "",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        deadline: "",
        startDate: "",
        addedDate: "",
        priority: 0,
        order: 0,
        description: "",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        deadline: "",
        startDate: "",
        addedDate: "",
        priority: 0,
        order: 0,
        description: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        deadline: "",
        startDate: "",
        addedDate: "",
        priority: 0,
        order: 0,
        description: "",
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatus.Completed,
        todoListId: "todolistId2",
        deadline: "",
        startDate: "",
        addedDate: "",
        priority: 0,
        order: 0,
        description: "",
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        deadline: "",
        startDate: "",
        addedDate: "",
        priority: 0,
        order: 0,
        description: "",
      },
    ],
  }
})

test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(startState, removeTaskAC("todolistId2", "2"))

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        deadline: "",
        startDate: "",
        addedDate: "",
        priority: 0,
        order: 0,
        description: "",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        deadline: "",
        startDate: "",
        addedDate: "",
        priority: 0,
        order: 0,
        description: "",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        deadline: "",
        startDate: "",
        addedDate: "",
        priority: 0,
        order: 0,
        description: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        deadline: "",
        startDate: "",
        addedDate: "",
        priority: 0,
        order: 0,
        description: "",
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        deadline: "",
        startDate: "",
        addedDate: "",
        priority: 0,
        order: 0,
        description: "",
      },
    ],
  })
})

test("correct task should be added to correct array", () => {
  const endState = tasksReducer(
    startState,
    addTaskAC({
      title: "juce",
      id: "4",
      status: TaskStatus.New,
      todoListId: "todolistId2",
      deadline: "",
      startDate: "",
      addedDate: "",
      priority: 0,
      order: 0,
      description: "",
    }),
  )

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juce")
  expect(endState["todolistId2"][0].status).toBe(TaskStatus.New)
})

test("status of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    updateTaskAC({
      id: "2",
      title: "milk",
      status: TaskStatus.New,
      todoListId: "todolistId2",
      deadline: "",
      startDate: "",
      addedDate: "",
      priority: 0,
      order: 0,
      description: "",
    }),
  )

  expect(endState["todolistId1"][1].status).toBe(TaskStatus.Completed)
  expect(endState["todolistId2"][1].status).toBe(TaskStatus.New)
})

test("title of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    updateTaskAC({
      id: "2",
      title: "eggs",
      status: TaskStatus.Completed,
      todoListId: "todolistId2",
      deadline: "",
      startDate: "",
      addedDate: "",
      priority: 0,
      order: 0,
      description: "",
    }),
  )

  expect(endState["todolistId1"][1].title).toBe("JS")
  expect(endState["todolistId2"][1].title).toBe("eggs")
})

test("new array should be added when new todolist is added", () => {
  const endState = tasksReducer(
    startState,
    addTodoListAC({ id: "todolistId3", title: "new todolist", addedDate: "", order: 0 }),
  )

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(startState, removeTodoListAC("todolistId2"))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
  // or
  expect(endState["todolistId2"]).toBeUndefined()
})
