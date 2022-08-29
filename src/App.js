import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MainBar from "./components/MainBar";
import Footer from "./components/Footer";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login";
import List from "./components/list";
import {Box} from '@mui/material';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'


const queryClient = new QueryClient()

const theme = createTheme();


function App() {
  return (
      <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
    <CssBaseline/>
    <BrowserRouter>
      <MainBar/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<React.Suspense fallback={<div>Loading...</div>}>
          <Box component={'section'} sx={{height:'100vh'}}>
            <Login/>
          </Box>
        </React.Suspense>}/>
        <Route path="/list" element={<React.Suspense fallback={<div>Loading...</div>}>
          <Box component={'section'} >
            <List/>
          </Box>
        </React.Suspense>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  </ThemeProvider>
      </QueryClientProvider>);
}

export default App;
