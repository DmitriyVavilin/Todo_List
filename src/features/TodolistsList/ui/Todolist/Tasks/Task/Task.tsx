import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskType} from "features/TodolistsList/api/todolists.api";
import {EditableSpan} from "common/components";
import {TaskStatuses} from "common/enums";
import {useActions} from "common/hooks";
import {tasksThunks} from "features/TodolistsList/tasks.reducer";
import {todolistsThunks} from "features/TodolistsList/model/todolists.reducer";
import s from 'features/TodolistsList/ui/Todolist/Tasks/Task/Task.module.css'

type Props = {
    task: TaskType;
    todolistId: string;
};

export const Task: React.FC<Props> = React.memo(({task, todolistId}) => {
    const {removeTask, updateTask} = useActions(tasksThunks)
    const {} = useActions(todolistsThunks)

    const removeTaskHandler = () => {
        removeTask({taskId: task.id, todolistId})
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({taskId: task.id, domainModel: {status}, todolistId,});
    }

    const changeTitleHandler = (title: string) => {
        updateTask({taskId: task.id, domainModel: {title}, todolistId});
    }

    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
            <Checkbox checked={task.status === TaskStatuses.Completed} color="primary"
                      onChange={changeStatusHandler}/>

            <EditableSpan value={task.title} onChange={changeTitleHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});
