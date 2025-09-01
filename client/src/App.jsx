import { useState } from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Home from './components/Home'


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route index element={ <Home/> } />
      <Route path='/dashboard' element={<Home/>} /> 
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
