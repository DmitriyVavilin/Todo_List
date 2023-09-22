import React, {useEffect} from "react";
import {Delete} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import {Task} from "features/TodolistsList/ui/Todolist/Task/Task";
import {TodolistDomainType, todolistsActions, todolistsThunks} from "features/TodolistsList/model/todolists.reducer";
import {tasksThunks} from "features/TodolistsList/tasks.reducer";
import {TaskType} from "features/TodolistsList/api/todolists.api";
import {TaskStatuses} from "common/enums";
import {useActions, useAppDispatch} from "common/hooks";
import {AddItemForm, EditableSpan} from "common/components";

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

export const Todolist: React.FC<Props> = React.memo(function ({todolist, tasks}) {
        const dispatch = useAppDispatch();
        const {addTask} = useActions(tasksThunks)
        const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks)
        const {changeTodolistFilter, changeTodolistEntityStatus} = useActions(todolistsActions)

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

        const onAllClickHandler = () => changeTodolistFilter({id: todolist.id, filter: "all"})

        const onActiveClickHandler = () => changeTodolistFilter({id: todolist.id, filter: "active"})

        const onCompletedClickHandler = () => changeTodolistFilter({id: todolist.id, filter: "completed"})

        let tasksForTodolist = tasks;

        if (todolist.filter === "active") {
            tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
        }
        if (todolist.filter === "completed") {
            tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
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
                <div>
                    {tasksForTodolist.map((t) => (
                        <Task
                            key={t.id}
                            task={t}
                            todolistId={todolist.id}
                        />
                    ))}
                </div>
                <div style={{paddingTop: "10px"}}>
                    <Button
                        variant={todolist.filter === "all" ? "outlined" : "text"}
                        onClick={onAllClickHandler}
                        color={"inherit"}
                    >
                        All
                    </Button>
                    <Button
                        variant={todolist.filter === "active" ? "outlined" : "text"}
                        onClick={onActiveClickHandler}
                        color={"primary"}
                    >
                        Active
                    </Button>
                    <Button
                        variant={todolist.filter === "completed" ? "outlined" : "text"}
                        onClick={onCompletedClickHandler}
                        color={"secondary"}
                    >
                        Completed
                    </Button>
                </div>
            </div>
        );
    })
;
