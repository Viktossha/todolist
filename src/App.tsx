import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle = 'What to learn'

    const [tasks, setTasks] = React.useState<TaskType[]>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: false},
        {id: 4, title: 'REACT', isDone: false},
    ]) //useState метод объекта React

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: number) => {
        const updatedState = tasks.filter(t => t.id !== taskId)
        setTasks(updatedState)
        // tasks.pop()
        // setTasks([...tasks])
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
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
