import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage/LoginPage'
import HomePages from './Pages/HomePages/HomePages'
import { ToastContainer } from 'react-toastify'
import Home from './Pages/Home/Home'

const App = () => {
const token =  localStorage.getItem('acccesstoken')
  return (
<>
<Routes>
 <Route path="/" element={<LoginPage/>} />
  <Route path='/home' element={<HomePages/>} />
  <Route path='/homes' element={<Home/>} />
</Routes>
<ToastContainer />
</>

  )
}


export default App