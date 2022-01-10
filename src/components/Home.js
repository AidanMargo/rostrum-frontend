import '../componentStyles/homeStyles.css'
import Todos from './Todos'
import GoogleApiWrapper from './MapContainer'
import {useState, useEffect, useRef } from 'react'
import {gsap} from 'gsap'


function Home ({user}) {

  // State variables and setting stat block
  const [studentCount, setStudentCount] = useState(null)
  const [aptCount, setAptCount] = useState(null)
  const dashboardRef = useRef()
  const statRef = useRef()
  const statRef2 = useRef()

  useEffect(() => {
    fetch("/api/me").then((response) => {
      if (response.ok) {
        response.json()
        .then(data => {
          setStudentCount(data.total_students)
          setAptCount(data.lifetime_appointments)
        })
      }
    })})
  

    // Gsap Animations
  useEffect(() => {
    gsap.to(dashboardRef.current, 1.5,  {marginLeft: '0', ease:'Power2.easeInOut'})
    gsap.to(statRef.current, 3, {opacity: '1', ease:'Power2.easeInOut' })
    gsap.to(statRef2.current, 3, {opacity: '1', ease:'Power2.easeInOut' })
  })

  
  
  return (
    <>
    { user && 

    <div className="dashboard-grid" ref={dashboardRef}>
      <div className="stats-container">
        <h2 className="stat" ref={statRef2}>Total students: {studentCount}</h2>
        <h2 className="stat" ref={statRef}>Total appointments: {aptCount} </h2>
      </div>
      <div className="map">
          <GoogleApiWrapper user={user}/>
      </div>
      <div className="todo-container" >
          <Todos user={user}/> 
      </div>
    </div>
    }
    </>
  )
}

export default Home