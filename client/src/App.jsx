// import { useState } from 'react'
// import { BrowserRouter , Route , Routes } from 'react-router-dom'
// import Home from './components/Home'


// function App() {

//   return (
//     <>
    // <BrowserRouter>
    // <Routes>
    //   <Route index element={ <Home/> } />
    //   <Route path='/dashboard' element={<Home/>} /> 
    // </Routes>
    // </BrowserRouter>
//     </>
//   )
// }

// export default App

// App.jsx (or your main app component)
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Home from './components/Home'

function App() {
    const [theme, setTheme] = useState('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Initialize theme
        const stored = localStorage.getItem("theme");
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(stored || systemTheme);
    }, []);

    if (!mounted) return null;

    return (
        <ThemeProvider>
          <BrowserRouter>
          <Routes>
            <Route index element={ <Home/> } />
            <Route path='/dashboard' element={<Home/>} /> 
          </Routes>
          </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;