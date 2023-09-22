import React, {useEffect} from "react";
import {TodolistDomainType} from "features/TodolistsList/model/todolists/todolists.reducer";
import {tasksThunks} from "features/TodolistsList/model/tasks/tasks.reducer";
import {TaskType} from "features/TodolistsList/api/todolists.api";
import {useActions, useAppDispatch} from "common/hooks";
import {AddItemForm} from "common/components";
import {FilterTasksButtons} from "features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "features/TodolistsList/ui/Todolist/Tasks/Tasks";
import {TodoListTitle} from "features/TodolistsList/ui/Todolist/TodoListTitle/TodoListTitle";

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

export const Todolist: React.FC<Props> = React.memo(function ({todolist, tasks}) {
        const dispatch = useAppDispatch();
        const {addTask} = useActions(tasksThunks)

        const {entityStatus,id} = todolist

        useEffect(() => {
            dispatch(tasksThunks.fetchTasks(id));
        }, []);

        const addTaskCallBack = (title: string) => {
            return addTask({title, todolistId: id}).unwrap()
        }

        return (
            <div>
                <TodoListTitle todolist={todolist}/>
                <AddItemForm addItem={addTaskCallBack} disabled={entityStatus === "loading"}/>
                <Tasks todolist={todolist} tasks={tasks}/>
                <div style={{paddingTop: "10px"}}>
                    <FilterTasksButtons todolist={todolist}/>
                </div>
            </div>
        );
    })
;
