import '../componentStyles/homeStyles.css'
import Todos from './Todos'
import GoogleApiWrapper from './MapContainer'
import {useState, useEffect, useRef } from 'react'
import {gsap} from 'gsap'
function Home ({user}) {

  const [studentCount, setStudentCount] = useState(null)
  const [aptCount, setAptCount] = useState(null)
  const dashboardRef = useRef()

  useEffect(() => {
    fetch("/api/me").then((response) => {
      if (response.ok) {
        response.json()
        .then(data => {
          setStudentCount(data.total_students)
          setAptCount(data.lifetime_appointments)
        })
      }
    })

    // fetch('https://zenquotes.io/api/today/8830d7872da9c54f273ed6a1f1970caee6c892a0',{
    //   method: 'GET',
    //   moder: 'cors',
    //   headers: {
    //     'Access-Control-Allow-Origin': 'https://zenquotes.io/api/today/8830d7872da9c54f273ed6a1f1970caee6c892a0',
    //     'Content-Type': 'application/json'
    //   },
    // })
    // .then(resp => resp.json())
    // .then(data => console.log(data))
  }, []);

  useEffect(() => {
    gsap.to(dashboardRef.current, 1.5,  {marginLeft: '0', ease:'Power2.easeInOut'})
  })

  
  
  return (
    <>
    { user && 

    <div className="dashboard-grid" ref={dashboardRef}>
      <div className="stats-container">
        <h2>Total students: {studentCount}</h2>
        <h2>Total appointments: {aptCount} </h2>
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