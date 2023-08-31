import {createSlice} from "@reduxjs/toolkit";
import {appActions} from "app/app.reducer";
import {authAPI, LoginParamsType} from "features/auth/auth.api";
import {clearTasksAndTodolists} from "common/actions";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError, thunkTryCatch} from "common/utils";
import {BaseResponseType} from "common/types";

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(authThunks.login.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        }).addCase(authThunks.logout.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        }).addCase(authThunks.initializeApp.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        })
    }
});


// thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>('auth/Login', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
   return thunkTryCatch(thunkAPI, async () => {
       const res = await authAPI.login(arg)
       if (res.data.resultCode === 0) {
           return {isLoggedIn: true}
       } else {
           const isShowAppError = !res.data.fieldsErrors.length
           handleServerAppError(res.data, dispatch, isShowAppError);
           return rejectWithValue(res.data)
       }
   })
})



const _login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType, { rejectValue: null | BaseResponseType }>('auth/Login', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}));
        const res = await authAPI.login(arg)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({status: "succeeded"}));
            return {isLoggedIn: true}
        } else {
            const isShowAppError = !res.data.fieldsErrors.length
            handleServerAppError(res.data, dispatch, isShowAppError);
            dispatch(appActions.setAppStatus({status: "failed"}));
            return rejectWithValue(res.data)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null)
    }
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>('auth/logout', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}));
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({status: "succeeded"}));
            dispatch(clearTasksAndTodolists());
            return {isLoggedIn: false}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null)
    }
})

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>('app/initializeApp', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            return {isLoggedIn: true}
        } else {
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppInitialized({isInitialized: true}));
    }
})

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = {login, logout, initializeApp}