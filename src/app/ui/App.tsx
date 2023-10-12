import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {HashRouter, Route, Routes} from "react-router-dom";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography,
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import "app/ui/App.css";
import {TodolistsList} from "features/TodolistsList/ui/TodolistsList";
import {ErrorSnackbar} from "common/ui";
import {useActions} from "common/hooks";
import {selectAppStatus, selectIsInitialized} from "app/model/app.selectors";
import {Login} from "features/Auth/ui/login/Login";
import {selectIsLoggedIn} from "features/Auth/model/auth.selectors";
import {authThunks} from "features/Auth/model/auth.slice";

function App() {
    const status = useSelector(selectAppStatus);
    const isInitialized = useSelector(selectIsInitialized);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const {initializeApp, logout} = useActions(authThunks)

    useEffect(() => {
        initializeApp()
    }, []);

    const logoutHandler = useCallback(() => {
        logout()
    }, []);

    if (!isInitialized) {
        return (
            <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
                <CircularProgress/>
            </div>
        );
    }

    return (
        <HashRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">News</Typography>
                        {isLoggedIn && (
                            <Button color="inherit" onClick={logoutHandler}>
                                Log out
                            </Button>
                        )}
                    </Toolbar>
                    {status === "loading" && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={"/"} element={<TodolistsList/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
        </HashRouter>
    );
}

export default App;