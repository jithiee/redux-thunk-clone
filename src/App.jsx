import { Routes , Route } from "react-router-dom"
import CreateTakss from "./pages/CreateTakss"
import TaskList from "./pages/TaskList"
import Navbar from "./components/Navbar"


function App() {


  return (
    <>
    <Navbar/>
    <Routes>
       <Route path="/" element={<CreateTakss/>} />
       <Route path="/taskilist" element={<TaskList/>} />
    </Routes>
    
    </>
  )
}

export default App



