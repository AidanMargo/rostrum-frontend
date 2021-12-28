import '../componentStyles/appStyles.css'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Login";
import Home from "./Home"
import Navbar from './Navbar'
import Landing from './Landing'
import SignUp from './SignUp'
import AptScheduler from './Scheduler';
import { useEffect, useState } from "react";
import StudentContainer from './StudentContainer';

function App() {
  
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/api/me").then((response) => {
      if (response.ok) {
        response.json()
        .then(data => {
          setUser(data.user)
        })
      }
    })
  }, []);


  const logout = (e) => {
    e.preventDefault()

    fetch('/api/logout', {
      method: "DELETE",
      headers: {
        "Content-Type": 'application/json'
      }
    })
    .then(() => setUser(null))
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar logout={logout} user={user}/>  
          <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/login' element={<Login user={user}/>} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/home' element={<Home user={user} />} />
              <Route path='/appointments' element={<AptScheduler user={user}/>} />
              <Route path='/students' element={<StudentContainer user={user} setUser={setUser} />} />
          </Routes> 
      </div>
    </BrowserRouter>
  );
}

export default App;
