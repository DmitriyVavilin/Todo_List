import {AppDispatch, AppRootStateType} from "app/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {BaseResponseType} from "common/types";

/**
 * Creates an asynchronous thunk for the application.
 * @template Generic for specifying types.
 * @property {AppRootStateType} state - Type of the root application state.
 * @property {AppDispatch} dispatch - Type of the application dispatcher.
 * @property {null | BaseResponseType} rejectValue - Type for the value in case of a failed request.
 */

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType;
    dispatch: AppDispatch;
    rejectValue: null | BaseResponseType;
}>();
