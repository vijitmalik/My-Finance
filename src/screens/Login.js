import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsAuthenticatedUser, setSelectedPage, setUser } from '../store/userSlice';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let loginApiUrl = process.env.REACT_APP_LOGIN_API_URL;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(loginApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            if (!response.ok) {
                throw new Error("Error while authenticating the user");
            }
            const data = await response.json();
            const { authorizationCode } = data;
            if (authorizationCode !== '') {
                dispatch(setUser({
                    username: "User",
                    bearerToken: authorizationCode,
                }));
                dispatch(setIsAuthenticatedUser(true));
                const userDetails = {
                    username: "User",
                    bearerToken: authorizationCode,
                    isAuthenticatedUser: true,
                    selectedPage: "home"
                }
                window.sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
                dispatch(setSelectedPage("home"));
                navigate('/home');
            };
        }
        catch (error) {
            console.log("Login failed: ", error);
        }
    };

    return (
        <Paper sx={{ display: "grid", padding: "50px", backgroundColor: "#f5f5f5" }}>
            <form>
                <TextField
                    label="Username"
                    value={username}
                    sx={{ margin: "20px" }}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    sx={{ margin: "20px" }}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" onClick={handleLogin} disabled={username === "" || password === ""} sx={{ margin: "20px" }}>
                    Login
                </Button>
            </form>
        </Paper>
    );
};

export default Login;
