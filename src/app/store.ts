import {tasksReducer} from "features/TodolistsList/model/tasks/tasks.reducer";
import {todolistsReducer} from "features/TodolistsList/model/todolists/todolists.reducer";
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {appReducer} from "app/model/app.reducer";
import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "features/Auth/model/auth.slice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authSlice,
  }
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

// @ts-ignore
window.store = store;
