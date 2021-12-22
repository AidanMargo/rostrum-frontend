import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {Scheduler, WeekView, Appointments, Toolbar, DateNavigator, TodayButton, AppointmentForm} from '@devexpress/dx-react-scheduler-material-ui';
import {useState, useEffect} from 'react'
import '../componentStyles/homeStyles.css'


export default function AptScheduler ()  {

  const [schedulerData, setSchedulerData] = useState(null)

  useEffect(() => {
    fetch('/api/me')
    .then(resp => resp.json())
    .then(data => setSchedulerData(data.user.appointments))
  }, [])

  const commitChanges = ({added, changed, deleted}) => {
    let data = schedulerData;
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data = [...data, { id: startingAddedId, ...added }];
    }
    if (changed) {
      data = data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
    }
    if (deleted !== undefined) {
      data = data.filter(appointment => appointment.id !== deleted);
    }
    return { data };
  };

  const appointments =  [
    { title: 'Mail New Leads for Follow Up', startDate: '2021-12-23T10:00' },
    { title: 'Product Meeting', startDate: '2019-06-23T10:30', endDate: '2019-06-23T11:30' },
    { title: 'Send Territory Sales Breakdown', startDate: '2019-06-23T12:35' },
  ];
  
  console.log(appointments)
  console.log(schedulerData)
  return (
    <>
    {schedulerData &&
   <div className="scheduler">
    <Paper>
      <Scheduler
        data={appointments}
        height={'auto'}
      >
        <ViewState/>
        <EditingState
            
          />
          <IntegratedEditing />
        <WeekView
          startDayHour={8}
          endDayHour={19}
        />
        <Appointments />
        <AppointmentForm />
      </Scheduler>
    </Paper>
  </div> }
  </>
  )}
