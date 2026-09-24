import { Routes , Route } from "react-router-dom"
import CreateTakss from "./pages/CreateTakss"
import TaskList from "./pages/TaskList"
import Navbar from "./components/Navbar"
import EditTask from "./pages/EditTask"



function App() {


  return (
    <>
    <Navbar/>
    <Routes>
       <Route path="/" element={<CreateTakss/>} />
       <Route path="/taskilist" element={<TaskList/>} />
       <Route path="/edit-task/:id" element={<EditTask/>} />
       

    </Routes>
    
    </>
  )
}

export default App



