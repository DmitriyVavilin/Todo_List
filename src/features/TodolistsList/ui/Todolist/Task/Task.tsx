import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskType} from "features/TodolistsList/api/todolists.api";
import {EditableSpan} from "common/components";
import {TaskStatuses} from "common/enums";
import {useActions} from "common/hooks";
import {tasksThunks} from "features/TodolistsList/tasks.reducer";
import {todolistsThunks} from "features/TodolistsList/model/todolists.reducer";

type TaskPropsType = {
    task: TaskType;
    todolistId: string;
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
};

export const Task = React.memo((props: TaskPropsType) => {
    const {removeTask, updateTask} = useActions(tasksThunks)
    const {} = useActions(todolistsThunks)

    const removeTaskHandler = () => {
        removeTask({taskId: props.task.id, todolistId: props.todolistId})
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({taskId: props.task.id, domainModel: {status}, todolistId: props.todolistId,});
    }

    const onTitleChangeHandler = useCallback(
        (newValue: string) => {
            props.changeTaskTitle(props.task.id, newValue, props.todolistId);
        },
        [props.task.id, props.todolistId],
    );

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox checked={props.task.status === TaskStatuses.Completed} color="primary"
                      onChange={changeStatusHandler}/>

            <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});
