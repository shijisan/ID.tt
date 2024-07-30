import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Homepage from './assets/pages/Homepage'
import Login from './assets/pages/Login'
import Register from './assets/pages/Register'
import StudentDashboard from './assets/pages/StudentDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />


      </Routes>
    </>
  )
}

export default App
