import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {todolistsThunks} from "features/TodolistsList/model/todolists/todolists.reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "common/components";
import {Todolist} from "features/TodolistsList/ui/Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {useActions} from "common/hooks";
import {selectTasks} from "features/TodolistsList/model/tasks/tasks.selectors";
import {selectTodolists} from "features/TodolistsList/model/todolists/todolists.selectors";
import {selectIsLoggedIn} from "features/Auth/model/auth.selectors";

export const TodolistsList = () => {
    const todolists = useSelector(selectTodolists);
    const tasks = useSelector(selectTasks);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const {
        fetchTodolists,
        addTodolist,
    } = useActions(todolistsThunks)

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        fetchTodolists()
    }, []);

    const addTodolistCallBack = useCallback(
        (title: string) => {
            return addTodolist(title).unwrap()
        },
        [],
    );

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>;
    }

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolistCallBack}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id];

                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={allTodolistTasks}
                                />
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};
