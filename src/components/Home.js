import '../componentStyles/homeStyles.css'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
// import Typography from '@mui/material/Typography'
import Todos from './Todos'
import MapContainer from './MapContainer'
import {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home ({user}) {

  const [studentCount, setStudentCount] = useState(null)

  useEffect(() => {
    fetch("/api/me").then((response) => {
      if (response.ok) {
        response.json()
        .then(data => {
          setStudentCount(data.total_students)
        })
      }
    })
  }, []);
  
  return (
    <>
    { user && 

    <div className="dashboard-grid">
      <div className="todo-container">
          <Todos user={user}/> 
      </div>
      <div className="map">
          <MapContainer />
      </div>
      <div className="stats-container">
        <h2>Total students: {studentCount}</h2>
      </div>
    </div>

    }
    </>
  )
}

export default Home