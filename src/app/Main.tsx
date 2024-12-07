import React, {useCallback} from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";
import {addTodoListAC} from "../features/todolists/model/todolists-reducer";
import {useAppDispatch} from "./hooks";

export const Main = () => {

    let dispatch = useAppDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])

    return (
        <Container fixed>
            <Grid container sx={{marginBottom: '30px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>

            <Grid container>
                <Todolists/>
            </Grid>

        </Container>
    );
};