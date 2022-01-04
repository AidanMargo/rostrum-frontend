import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {Scheduler, WeekView, Appointments, Toolbar, DateNavigator, TodayButton, AppointmentForm} from '@devexpress/dx-react-scheduler-material-ui';
import {useState, useEffect} from 'react'
import '../componentStyles/homeStyles.css'


export default function AptScheduler ({user})  {

  const [schedulerData, setSchedulerData] = useState(null)

  // Get all of the appointments
  useEffect(() => {
    fetch('/api/me')
    .then(resp => resp.json())
    .then(data => {
      const newData = []
      data.user.appointments.forEach(appointment => {
        const newA = {
          id: appointment.id,
          startDate: appointment.startDate,
          endDate: appointment.endDate,
          notes: appointment.notes,
          title: appointment.title
        }
        newData.push(newA)
      })
      setSchedulerData(newData)}
      )
  }, [])

  // Commit a new appointment to backend
  const addAppointment = (data) => {
    const {id, teacher_id, startDate, endDate, allDay, notes, title} = data
    fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id, 
        teacher_id,
        startDate,
        endDate,
        allDay,
        notes,
        title
      })
    })
    .then(resp => resp.json())
  }


  // Update an appointment 
  const updateAppointment = (data, id) => {
    const {startDate, endDate, allDay, notes, title} = data
    fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDate,
        endDate,
        allDay,
        notes,
        title
      })
    })
    .then(resp => resp.json())
  }

  // Delete an appointment
  const deleteAppointment = (id) => {
    fetch(`/api/appointments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  // Function to edit scheduler
  const commitChanges = ({ added, changed, deleted }) => {
    setSchedulerData((state) => {
      let data = state;
      if (added) {
        const newAppointment = { ...added, teacher_id: user.id }
        data = [...data, newAppointment];
        addAppointment(newAppointment)
      }
      if (changed) {
        let changedApt = {}
        data = data.map(appointment => {
            if(changed[appointment.id]) {
              changedApt = { ...appointment, ...changed[appointment.id] }
              updateAppointment(changedApt, appointment.id)
              return changedApt
            } else {
              return  appointment
            }
          })
        }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
        deleteAppointment(deleted)
      }
      return data;
    });
  }

  return (
    <>
    {schedulerData &&    
   <div className="scheduler">
    <Paper>
      <Scheduler
        data={schedulerData}
        height={'auto'}
      >
        <ViewState/>
        <EditingState
        onCommitChanges={commitChanges}/>
        <IntegratedEditing />
        <WeekView
          startDayHour={8}
          endDayHour={19}
        />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        <AppointmentForm />
      </Scheduler>
    </Paper>
  </div>}
  </>
  )}
