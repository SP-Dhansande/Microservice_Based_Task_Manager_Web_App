import { ThemeProvider } from '@mui/material';
import { darkTheme } from './theme/Darktheme';
import Navbar from './page/Navbar/Navbar';
import { Home } from './Home/Home';
import { Auth } from './page/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getUserProfile } from './ReduxToolkit/AuthSlice';
import { fetchTasks } from './ReduxToolkit/TaskSlice'; // Assuming fetchTasks is defined in TaskSlice

function App() {
  const dispatch = useDispatch();
  const { task,auth } = useSelector(store => store);

  useEffect(() => {
   dispatch(fetchTasks({}));
      dispatch(getUserProfile(auth.jwt || localStorage.getItem("jwt")));
    
    dispatch(fetchTasks({}));
  }, [auth.jwt, dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      {auth.user ? (
        <div>
          <Navbar />
          <Home />
        </div>
      ) : (
        <Auth />
      )}
    </ThemeProvider>
  );
}

export default App;
