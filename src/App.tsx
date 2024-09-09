import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

function App() {
    const todoListTitle_1 = 'What to learn'
    const todoListTitle_2 = 'What to buy'

    const tasks_1: TaskType[] = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: false},
        {id: 4, title: 'REACT', isDone: false},
    ]

    const tasks_2: TaskType[] = [
        {id: 4, title: 'milk', isDone: true},
        {id: 5, title: 'soap', isDone: false},
        {id: 6, title: 'eggs', isDone: true},
    ]

    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks_1}/>
            <TodoList title={todoListTitle_2} tasks={tasks_2}/>
        </div>
    );
}

export default App;
