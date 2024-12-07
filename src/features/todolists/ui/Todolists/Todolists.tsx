import React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodoList} from "./Todolist/TodoList";
import {useAppSelector} from "../../../../app/hooks";
import {selectTodolists} from "../../model/todolists-selectors";

export const Todolists = () => {

    let todoLists = useAppSelector(selectTodolists)

    return (
        <>
            {todoLists.map(l => {
                return (
                    <Grid key={l.id} item sx={{margin: '20px'}}>
                        <Paper elevation={3} sx={{padding: '20px'}}>
                            <TodoList todolist={l}/>
                        </Paper>
                    </Grid>)
            })}
        </>
    );
};