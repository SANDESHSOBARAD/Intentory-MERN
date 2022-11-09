import React from 'react'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import about from './pages/about'
import Add from './pages/Add'
import 'bootstrap/dist/css/bootstrap.min.css';


import './index.css'
import { MainContextProvider } from './context/MainContext'
import { ThemeProvider,createTheme } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <BrowserRouter>

<ThemeProvider theme={darkTheme}>
  <ConfirmProvider>
 
    <div>
         <Route path="/login" exact component={Login}/>
         <Route path="/register" exact component={Register}/>
         <MainContextProvider>
           <Route path="/home" exact component={Home}/>
         
         <Route path="/about" exact component={about}/>
         <Route path="/add" exact component={Add}/>
         <Redirect from="*" to="/login" />

    




         </MainContextProvider>  
    </div>
    </ConfirmProvider>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App