import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {todolistsThunks} from "features/TodolistsList/model/todolists.reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "common/components";
import {Todolist} from "features/TodolistsList/ui/Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {useActions} from "common/hooks";
import {selectTasks} from "features/TodolistsList/tasks.selectors";
import {selectTodolists} from "features/TodolistsList/todolists.selectors";
import {selectIsLoggedIn} from "features/Auth/model/auth.selectors";

export const TodolistsList = () => {
    const todolists = useSelector(selectTodolists);
    const tasks = useSelector(selectTasks);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const {
        fetchTodolists,
        addTodolist,
        changeTodolistTitle: changeTodolistTitleThunk
    } = useActions(todolistsThunks)

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        fetchTodolists()
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        changeTodolistTitleThunk({id, title})
    }, []);

    const addTodolistCallBack = useCallback(
        (title: string) => {
            addTodolist(title)
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
