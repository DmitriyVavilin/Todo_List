import React, {FC} from 'react';
import {Button} from "@mui/material";
import {useActions} from "common/hooks";
import {FilterValuesType, TodolistDomainType, todolistsActions} from "features/TodolistsList/model/todolists/todolists.reducer";

type Props = {
    todolist: TodolistDomainType;
}

export const FilterTasksButtons:FC<Props> = ({todolist}) => {

    const {changeTodolistFilter} = useActions(todolistsActions)

    const changeTodolistFilterHandler = (filter: FilterValuesType) => {
        changeTodolistFilter({id: todolist.id, filter})
    }

    return (
        <>
            <Button
                variant={todolist.filter === "all" ? "outlined" : "text"}
                onClick={()=>changeTodolistFilterHandler('all')}
                color={"inherit"}
            >
                All
            </Button>
            <Button
                variant={todolist.filter === "active" ? "outlined" : "text"}
                onClick={()=>changeTodolistFilterHandler('active')}
                color={"primary"}
            >
                Active
            </Button>
            <Button
                variant={todolist.filter === "completed" ? "outlined" : "text"}
                onClick={()=>changeTodolistFilterHandler('completed')}
                color={"secondary"}
            >
                Completed
            </Button>
        </>
    );
};

