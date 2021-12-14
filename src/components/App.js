import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Login from "./Login";
import TeacherLogin from './TeacherLogin'
import Home from "./Home"
import Navbar from './Navbar'
import Landing from './Landing'
import SignUp from './SignUp'
import UserInfo from "./UserInfo";
import { useEffect, useState } from "react";

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/api/me").then((response) => {
      if (response.ok) {
        response.json()
        .then(user => setUser(user))
      }
    });
  }, []);

  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />    
     <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/teacherlogin' element={<TeacherLogin />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path= '/info' element={<UserInfo user={user}/>} />
        <Route path='/home' element={<Home />} />


       </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
