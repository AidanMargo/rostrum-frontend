import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Login from "./Login";
import Home from "./Home"
import Navbar from './Navbar'
import Landing from './Landing'
import SignUp from './SignUp'


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
     <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />


       </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
