import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage"
import Intro from "./components/Intro"
import Select from "./components/Select"
import Order from "./components/Order"
import Advanced from "./components/Advanced"



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path = "/" element={<HomePage/>} />
        <Route path = "/intro" element={<Intro/>} />
        <Route path = "/select" element={<Select/>} />
        <Route path = "/order" element={<Order/>} />
        <Route path = "/advanced" element={<Advanced/>} />
      </Routes>
    </Router>
  )
}
export default App