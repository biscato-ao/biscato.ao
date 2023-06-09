import React from 'react';
import {
  BrowserRouter as
  Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard"; 
import CreateJob from "./pages/CreateJob";
import Login from "./pages/Login";
import Register from './pages/Register';

function App() {
  return <>
  <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='createJob' element={<CreateJob/>}/>
    </Routes>
  </Router>
  </>
}
export default App;
