import {AppDispatch, AppRootStateType} from 'app/store';
import {handleServerNetworkError} from 'common/utils/handle-server-network-error';
import {BaseThunkAPI} from '@reduxjs/toolkit/dist/createAsyncThunk';
import {appActions} from 'app/app.reducer';
import {BaseResponseType} from "common/types";

/**
 * A utility function for handling asynchronous logic within Redux thunks with error handling.
 *
 * @template T - The type of the result of the asynchronous logic.
 * @param {BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>} thunkAPI - The base thunk API object.
 * @param {() => Promise<T>} logic - The asynchronous logic function to be executed.
 * @returns {Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>} A promise containing the result of the logic or a rejected value.
 */

export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>,
    logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(appActions.setAppStatus({status: "loading"}));
    try {
        return await logic();
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppStatus({status: "idle"}));
    }
};