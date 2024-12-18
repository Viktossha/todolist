import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import axios from "axios";

const configs = {
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        'API-KEY': process.env.REACT_APP_API_KEY
    }
}

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{[key: string]: Task[]}>({})

    useEffect(() => {
        axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
            }
        }).then(res => {
            const todolists = res.data
            setTodolists(todolists)
            todolists.forEach(tl => {
                axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/${tl.id}/tasks`, configs)
                    .then(res => {
                        setTasks({...tasks, [tl.id]: res.data.items})
                    })
            })
        })
    }, [])

    const createTodolistHandler = (title: string) => {
        axios.post<Response<{ item: Todolist }>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, configs)
            .then(res => setTodolists([res.data.data.item, ...todolists]))
    }

    const removeTodolistHandler = (id: string) => {
        axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, configs)
            .then(() => setTodolists(todolists.filter(el => el.id !== id)))
    }

    const updateTodolistHandler = (id: string, title: string) => {
        axios.put<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, configs)
            .then(res => setTodolists(todolists.map(el => el.id === id ? {...el, title: title} : el)))
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        axios.post<Response<{item: Task}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title}, configs)
            .then(res => {
                const newTask = res.data.data.item
                // console.log(tasks, 'tasks object');
                // console.log(todolistId, 'todolistId');
                // console.log(tasks[todolistId], 'tasks[todolistId]');
                // console.log(res.data)
                setTasks({
                    ...tasks,
                    [todolistId]: [newTask, ...(tasks[todolistId] || [])]
                });
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, configs)
            .then(() => {
                setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
            })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task) => {
        const model: UpdateTaskModel = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: e.currentTarget.checked ? 2 : 0
        }

        axios.put<Response<{item: Task}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`, model, configs)
            .then(res => {
                const newTask = res.data.data.item
                setTasks({...tasks, [task.todoListId]: tasks[task.todoListId].map(t => t.id === task.id ? newTask : t)})

                //const newTasks = tasks[task.todoListId].map(t => (t.id === task.id ? { ...t, ...model } : t))
                // setTasks({ ...tasks, [task.todoListId]: newTasks })
            })
    }

    const changeTaskTitleHandler = (title: string, task: Task) => {
        const model: UpdateTaskModel = {
            title: title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: task.status
        }

        axios.put<Response<{item: Task}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`, model, configs)
            .then(res => {
                const newTask = res.data.data.item
                setTasks({...tasks, [task.todoListId]: tasks[task.todoListId].map(t => t.id === task.id ? newTask : t)})
            })

    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map((tl: any) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                oldTitle={tl.title}
                                updateTitle={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: Task) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            oldTitle={task.title}
                                            updateTitle={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}

type Todolist = {
    id: string
    addedDate: string
    order: number
    title: string
}

type Response<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: T
}

type FieldError = {
    error: string
    field: string
}

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Task[]
}

export type Task = {
    description: string | null
    title: string
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type UpdateTaskModel = {
    title: string
    description: string | null
    priority: number
    startDate: string | null
    deadline: string | null
    status: number
}