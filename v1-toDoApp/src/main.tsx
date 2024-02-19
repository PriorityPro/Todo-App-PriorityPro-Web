import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.tsx'
import './globals.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  //Its worth noting that in React 18 when you run in dev mode with React.StrictMode on. Your useEffect hook will always run atleast twice because your component is mounted twice.
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<App />} />
  </Routes>
</BrowserRouter>,
)
