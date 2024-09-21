import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle = 'What to learn'

    const [tasks, setTasks] = React.useState<TaskType[]>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'REACT', isDone: false},
    ]) //useState метод объекта React

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: string) => {
        const updatedState = tasks.filter(t => t.id !== taskId)
        setTasks(updatedState)
        // tasks.pop()
        // setTasks([...tasks])
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        const updatedState = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        setTasks(updatedState)
    }

    const changeFilter = (filterValue: FilterValuesType) => {
        setFilter(filterValue)
    }

    const getFilteredTasks = (allTasks: TaskType[], currentFilter: FilterValuesType): TaskType[] => {
        switch (currentFilter) {
            case "active":
               return allTasks.filter(t => !t.isDone)
            case "completed":
                return allTasks.filter(t => t.isDone)
            default:
                return allTasks
        }
    }

    const filteredTasks = getFilteredTasks(tasks, filter)

    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={filteredTasks}
                      filter={filter}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
