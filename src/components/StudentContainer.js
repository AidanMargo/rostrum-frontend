import StudentCard from './StudentCard'
import Search from './Search'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import '../componentStyles/studentContainerStyles.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StudentContainer({user}) {

  const navigate = useNavigate()
  const [render, setRender] = useState(false)
  const [students, setStudents] = useState([])
  const [open, setOpen] = useState(false);
  const [newStudentInfo, setNewStudentInfo] = useState({
    first_name: '',
    last_name: '',
    age: null,
    email: '',
    phone_number: '',
    notes: ''
  })

  useEffect(() => {
    fetch('/api/me')
    .then(resp => resp.json())
    .then(data => setStudents(data.user.students))
  }, [render])

  // Modal Style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

    // Fetch User again to get students 
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  // Search functionality
  const [search, setSearch] = useState('')

  const handleSearch = (e) => setSearch(e.target.value)

  const searchResults = () => {
    if(search.length > 0 && user){
      return students.filter(student => student.first_name.toLowerCase().includes(search.toLowerCase())
      || student.last_name.toLowerCase().includes(search.toLowerCase()))
    } else {
      return students
    }
  }

  // Handle student info and create new student
  const handleNewStudentInfo = (e) => {
    setNewStudentInfo({...newStudentInfo, [e.target.name]:e.target.value})
    console.log(newStudentInfo)
    }

  const createStudent = (e, newStudentInfo) => {
    const {first_name, last_name, age, email, phone_number, notes} = newStudentInfo

    fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name,
        last_name,
        age,
        email,
        phone_number,
        notes
      })
    })
    .then(resp => resp.json())
    .then(data => {
      setStudents([...students, data])
      setRender(!render)
      setNewStudentInfo({
        first_name: '',
        last_name: '',
        age: null,
        email: '',
        phone_number: '',
        notes: ''
      })
      handleClose()
    })}

  // Delete a student

  return (
    <>
      { user && 
      <>
      <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
            <Box component="form" novalidate onSubmit={(e) => createStudent(e, newStudentInfo)} sx={style}>
              <TextField type="text"
               margin="normal"
               name="first_name"
               label='First Name'
               fullWidth
               onChange={(e) => handleNewStudentInfo(e)}
               value={newStudentInfo.first_name}/>
              <TextField type="text"
               margin="normal"
               name="last_name"
               label='Last Name'
               fullWidth
               onChange={(e) => handleNewStudentInfo(e)}
               value={newStudentInfo.last_name}/>
              <TextField type="number"
               margin="normal"
               name="age"
               label='Age'
               fullWidth
               onChange={(e) => handleNewStudentInfo(e)}
               value={newStudentInfo.age}/>
              <TextField type="email"
               margin="normal"
               name="email"
               label='Email'
               fullWidth
               onChange={(e) => handleNewStudentInfo(e)}
               value={newStudentInfo.email}/>
              <TextField type="text"
               margin="normal"
               name="phone_number"
               label='Phone Number'
               fullWidth
               onChange={(e) => handleNewStudentInfo(e)}
               value={newStudentInfo.phone_number}/>    
               <TextField type="textarea"
               margin="normal"
               name="notes"
               label='Notes'
               fullWidth
               onChange={(e) => handleNewStudentInfo(e)}
               value={newStudentInfo.notes}/>          
              
              <div className='action-btns'>
                <Button variant="contained" onClick={(e) => createStudent(e, newStudentInfo)}>Save</Button>
              </div>   
            </Box>
           </Modal>
      <div className= 'search-container'>
        <Button variant='contained' color='secondary' onClick={() => handleOpen()}>New Student </Button> 
        <Search search={search} handleSearch={handleSearch}/>
      </div>
      <div className="student-container">
        {searchResults().map(student => <StudentCard student={student} setStudents={setStudents}/>)}
      </div>
      </>}
    </>
  )
}