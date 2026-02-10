import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router";
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";

const ActivitiesPage = () => {
  return (<Box sx={{ p: 2 }}>
    <ActivityForm onActivityAdded={() => window.location.reload()} />
    <ActivityList />
  </Box>);
}

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);
  
  useEffect(() => {
    if (token) {
      dispatch(setCredentials({token, user: tokenData}));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
      <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
        PulseStack
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3, opacity: 0.85 }}>
        Your activity hub. Sign in to log workouts and get AI recommendations.
      </Typography>
      <Button variant="contained" color="primary" size="large" onClick={() => logIn()} sx={{ textTransform: 'none', px: 3, py: 1.5 }}>
        Sign in
      </Button>
    </Box>
            ) : (
              // <div>
              //   <pre>{JSON.stringify(tokenData, null, 2)}</pre>
              //   <pre>{JSON.stringify(token, null, 2)}</pre>
              // </div>

             

              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>PulseStack</Typography>
                  <Button variant="outlined" size="small" onClick={logOut}>Logout</Button>
                </Box>
              <Routes>
                <Route path="/activities" element={<ActivitiesPage />}/>
                <Route path="/activities/:id" element={<ActivityDetail />}/>

                <Route path="/" element={token ? <Navigate to="/activities" replace/> : <Typography>Welcome! Please sign in.</Typography>} />
              </Routes>
            </Box>
            )}
    </Router>
  )
}

export default App
