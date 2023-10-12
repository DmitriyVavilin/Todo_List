import {createSlice} from "@reduxjs/toolkit";
import {appActions} from "app/model/app.reducer";
import {authAPI, LoginParamsType, securityAPI} from "features/Auth/api/auth.api";
import {clearTasksAndTodolists} from "common/actions";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError, thunkTryCatch} from "common/utils";
import {ResultCode} from "common/enums";

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("Auth/login", async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.login(arg);
        if (res.data.resultCode === ResultCode.Success) {
            return {isLoggedIn: true};
        } else {
            const isShowAppError = !res.data.fieldsErrors.length;
            handleServerAppError(res.data, dispatch, isShowAppError);
            return rejectWithValue(res.data);
        }
    });
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("Auth/logout", async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.logout();
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(clearTasksAndTodolists());
            return {isLoggedIn: false};
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    });
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("app/initializeApp",
    async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        const res = await authAPI.me();
        if (res.data.resultCode === ResultCode.Success) {
            return {isLoggedIn: true};
        } else {
            return rejectWithValue(null);
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppInitialized({isInitialized: true}));
    }
});

const getCaptcha = createAppAsyncThunk("app/getCaptcha",async (arg, thunkAPI)=>{
    const {dispatch,rejectWithValue} = thunkAPI
    try {
        const res = await securityAPI.getCaptcha()
        debugger
        if (res?.data?.url) {
           return {
               getCaptcha: res.data.url
           }
        }else {
            return rejectWithValue(null);
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppInitialized({isInitialized: true}));
    }
})


const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        captchaUrl: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            }).addCase(getCaptcha.fulfilled,(state, action) => {
                state.captchaUrl = action.payload.getCaptcha
        });
    },
});


// homework  add addMather
export const authSlice = slice.reducer;
export const authThunks = {login, logout, initializeApp,getCaptcha};
