import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import { AppBar, Toolbar, Button, IconButton, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectUser, setData, setIsAuthenticatedUser, setSelectedPage, setUser } from './store/userSlice';
import ProtectedRoute from './utils/ProtectedRoute';
import Chart from './screens/Chart';
import TableComponent from './screens/Table';
import './App.css';

function App() {

  const dispatch = useDispatch();
  const userSelector = useSelector(selectUser)
  const dataAPIURL = process.env.REACT_APP_DATA_API_URL;

  useEffect(() => {
    const userDetails = JSON.parse(window.sessionStorage.getItem("userDetails"));
    if (userDetails) {
      dispatch(setUser({
        username: userDetails.username,
        bearerToken: userDetails.bearerToken
      }));
      dispatch(setIsAuthenticatedUser(userDetails.isAuthenticatedUser));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userSelector.isAuthenticatedUser) {
      const fetchData = async () => {
        try {
          const response = await fetch(dataAPIURL, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userSelector.bearerToken}`,
            },
          });

          if (!response.ok) {
            throw new Error("Error getting response from data API");
          }
          const { data } = await response.json();
          dispatch(setData(data));
        }
        catch (error) {
        }
      }
      userSelector.bearerToken !== '' && fetchData();
    }
  }, [dataAPIURL, dispatch, userSelector])

  const handleLogoutUser = () => {
    window.sessionStorage.removeItem("userDetails");
    dispatch(logoutUser());
  };

  return (
    <BrowserRouter>
      {userSelector?.isAuthenticatedUser &&
        <AppBar position="static" elevation={4}>
          <Toolbar>
            <IconButton size="large">Logo</IconButton>
          </Toolbar>
        </AppBar>
      }
      <div className='appBody'>
        <Stack className='bodyStack' direction="row">
          {userSelector?.isAuthenticatedUser && (
            <Stack sx={{height:"100%"}} className='drawerStack'>
              <Button sx={{marginTop:"20px", color:`${userSelector?.selectedPage === "home" ? "blue" : "black" }`, fontSize:"20px"}} onClick={() => dispatch(setSelectedPage('home'))} component={NavLink} to="/home">
                  Home
                </Button>
                <Button sx={{marginTop:"20px", color:`${userSelector?.selectedPage === "table" ? "blue" : "black" }`, fontSize:"20px"}} onClick={() => dispatch(setSelectedPage('table'))} component={NavLink} to="/table">
                  Table
                </Button>
                <Button sx={{marginTop:"20px", color:`${userSelector?.selectedPage === "chart" ? "blue" : "black" }`, fontSize:"20px"}} onClick={() => dispatch(setSelectedPage('chart'))} component={NavLink} to="/chart">
                  Chart
                </Button>
                <Button sx={{marginTop:"100%"}} color="error" onClick={handleLogoutUser}>
                  Logout
              </Button>
            </Stack>
          )}
          <div className='main-content'>
          <Routes>
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/" element={
            <Login />
          } />
          <Route path='/home' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/table' element={
            <ProtectedRoute>
              <TableComponent />
            </ProtectedRoute>
          } />
          <Route path='/chart' element={
            <ProtectedRoute>
              <Chart />
            </ProtectedRoute>
          } />
        </Routes>
          </div>
        </Stack>
        {/* <Box display="flex" justifyContent="space-between" marginTop={1} sx={{overflowX: 'auto'}} className="box"> */}
        {/* {userSelector?.isAuthenticatedUser &&
          (
            <div className='drawerDiv'>
              <Drawer variant="permanent" anchor="left" className="drawer">
                <Button onClick={() => dispatch(setSelectedPage('home'))} component={NavLink} to="/home">
                  Home
                </Button>
                <Button onClick={() => dispatch(setSelectedPage('table'))} component={NavLink} to="/table">
                  Table
                </Button>
                <Button onClick={() => dispatch(setSelectedPage('chart'))} component={NavLink} to="/chart">
                  Chart
                </Button>
                <Button color="error" onClick={handleLogoutUser}>
                  Logout
                </Button>
              </Drawer>
            </div>
          )} */}

        {/* <Routes>
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/" element={
            <Login />
          } />
          <Route path='/home' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/table' element={
            <ProtectedRoute>
              <TableComponent />
            </ProtectedRoute>
          } />
          <Route path='/chart' element={
            <ProtectedRoute>
              <Chart />
            </ProtectedRoute>
          } />
        </Routes> */}
      {/* </Box> */}
      </div>
      
    </BrowserRouter>
  );
}

export default App;
