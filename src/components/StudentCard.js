import '../componentStyles/studentCardStyles.css'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Modal from '@mui/material/Modal'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';


export default function StudentCard({student, student:{id, age, email, first_name, last_name, phone_number, notes}}) {

  // State Variables
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone_number: phone_number,
    notes: notes
  })

  // Style for the Modal
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

  // Expand functionality for student contact info
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


  // Handle State
  const handleExpandClick = () => setExpanded(!expanded)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleStudentInfo = (e) => {
    setStudentInfo({...studentInfo, [e.target.name]:e.target.value})
  }

  // Update student information
  const updateStudent = (e, id, studentInfo) => {
    const {email, phone_number, first_name, last_name, notes} = studentInfo
    e.preventDefault()

    fetch(`/api/students/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        phone_number,
        notes
      })
    })
    .then(window.location.reload())
  }

  // Delete student
  const deleteStudent = (e, id) => {
    e.preventDefault()
    fetch(`/api/students/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => window.location.reload())
  }


  return (
    <div className="student-card">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {first_name} {last_name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            
          </Typography>
          <Typography variant="body2">
            {notes}
          </Typography>
        </CardContent>
        <CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Email: {email}</Typography>
          <Typography paragraph>Phone: {phone_number}</Typography>

          <Button variant='contained' color='secondary' onClick={() => handleOpen()}>Edit Student</Button> 
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
            <Box component="form" novalidate onSubmit={(e) => updateStudent(e, id, studentInfo )} sx={style}>
              <TextField type="text"
               margin="normal"
               name="first_name"
               label='First Name'
               fullWidth
               onChange={(e) => handleStudentInfo(e)}
               value={studentInfo.first_name}/>
              <TextField type="text"
               margin="normal"
               name="last_name"
               label='Last Name'
               fullWidth
               onChange={(e) => handleStudentInfo(e)}
               value={studentInfo.last_name}/>
              <TextField type="text"
               margin="normal"
               name="email"
               label='Email'
               fullWidth
               onChange={(e) => handleStudentInfo(e)}
               value={studentInfo.email}/>
              <TextField type="text"
               margin="normal"
               name="phone_number"
               label='Phone Number'
               fullWidth
               onChange={(e) => handleStudentInfo(e)}
               value={studentInfo.phone_number}/>
               <TextField type="textarea"
               margin="normal"
               name="notes"
               label='Notes'
               fullWidth
               onChange={(e) => handleStudentInfo(e)}
               value={studentInfo.notes}/>

              <div className='action-btns'>
                <Button variant="contained" onClick={(e) => updateStudent(e, id, studentInfo )}>Save</Button>
                <Button variant="contained" color='error' onClick={e => deleteStudent(e, id)}>Delete</Button>
              </div>   
            </Box>
           </Modal>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}