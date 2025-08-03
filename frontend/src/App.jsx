import { useState } from 'react'

import './App.css'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import SeekerDashboard from './components/SeekerDashboard'
import ExpertDashboard from './components/ExpertDashboard'
function App() {
  

  return (
    <>
    
    <BrowserRouter>
     <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <Routes>
      {/* <Route path="/" element={<Home/>}></Route> */}
       <Route path="/signup" element={<Signup/>}></Route>
       <Route path="/login" element={<Login/>}></Route>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/seekerDashboard" element={<SeekerDashboard/>}></Route>
      <Route path="/expertDashboard" element={<ExpertDashboard/>}></Route>

     
       
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
