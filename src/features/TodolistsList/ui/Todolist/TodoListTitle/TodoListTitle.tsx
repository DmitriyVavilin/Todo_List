import React, {FC} from 'react';
import {EditableSpan} from "common/components";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TodolistDomainType, todolistsThunks} from "features/TodolistsList/model/todolists/todolists.reducer";
import {useActions} from "common/hooks";

type Props = {
    todolist: TodolistDomainType
}

export const TodoListTitle:FC<Props> = ({todolist}) => {
    const {id,title,entityStatus} = todolist
    const {removeTodolist,changeTodolistTitle} = useActions(todolistsThunks)

    const removeTodolistHandler = () => {
        removeTodolist(id);
    };

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle({id, title});
    }

    return (
        <h3>
            <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
                <Delete/>
            </IconButton>
        </h3>
    );
};

