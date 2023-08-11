import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Products from '../Pages/Products'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Products/>} ></Route>
        <Route path="/signup" element={<Signup/>} ></Route>
        <Route path="/login" element={<Login/>} ></Route>
    </Routes>
  )
}

export default AllRoutes