
import { Routes, Route, Router } from "react-router-dom"

import Home from "./components/home"
import Folder from "./components/folder"

function App() {

  return(
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/folder/:id" element={<Folder/>} />
    </Routes>
  )
  
    
}

export default App
