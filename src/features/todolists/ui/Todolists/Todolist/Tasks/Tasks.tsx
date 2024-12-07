import React from 'react';
import List from "@mui/material/List";
import {Task} from "./Task/Task";
import {TaskType} from "../TodoList";
import {FilterValuesType, TodoListType} from "../../../../../../app/App";
import {useAppSelector} from "../../../../../../app/hooks";
import {selectTasks} from "../../../../model/tasks-selectors";

type Props = {
    todolist: TodoListType
}

export const Tasks = ({todolist}: Props) => {

    let tasks = useAppSelector(selectTasks)

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

    const tasksForTodolists = getFilteredTasks(tasks[todolist.id], todolist.filter)

    return (
        <>
            {tasksForTodolists.length === 0
                ? <p>Список пуст</p>
                : <List>
                    {tasksForTodolists.map((t: TaskType) => {
                        return <Task key={t.id} task={t} todolist={todolist}/>
                    })}
                </List>}
        </>
    );
};