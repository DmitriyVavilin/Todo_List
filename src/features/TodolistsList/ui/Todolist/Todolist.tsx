import React, {useEffect} from "react";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {TodolistDomainType, todolistsThunks} from "features/TodolistsList/model/todolists.reducer";
import {tasksThunks} from "features/TodolistsList/tasks.reducer";
import {TaskType} from "features/TodolistsList/api/todolists.api";
import {useActions, useAppDispatch} from "common/hooks";
import {AddItemForm, EditableSpan} from "common/components";
import {FilterTasksButtons} from "features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "features/TodolistsList/ui/Todolist/Tasks/Tasks";

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

export const Todolist: React.FC<Props> = React.memo(function ({todolist, tasks}) {
        const dispatch = useAppDispatch();
        const {addTask} = useActions(tasksThunks)
        const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks)

        useEffect(() => {
            dispatch(tasksThunks.fetchTasks(todolist.id));
        }, []);

        const addTaskCallBack = (title: string) => {
            addTask({title, todolistId: todolist.id});
        }

        const removeTodolistHandler = () => {
            removeTodolist(todolist.id);
        };

        const changeTodolistTitleHandler = (title: string) => {
            changeTodolistTitle({id: todolist.id, title});
        }

        return (
            <div>
                <h3>
                    <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
                    <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskCallBack} disabled={todolist.entityStatus === "loading"}/>
                <Tasks todolist={todolist} tasks={tasks}/>
                <div style={{paddingTop: "10px"}}>
                    <FilterTasksButtons todolist={todolist}/>
                </div>
            </div>
        );
    })
;
