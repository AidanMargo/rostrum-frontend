import  Box  from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'


export default function UserInfo({user}) {

  const navigate = useNavigate()

  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    profile_pic: null,
    address: '',
    phone_number: ''
  })

  const handleData = (e) => {
    setProfileData({...profileData, [e.target.name]: e.target.value})
  }


  const updateProfile = (e, profileData) => {
    const {first_name, last_name, profile_pic, address, phone_number} = profileData
    e.preventDefault()

    if(user.type === 'teacher'){
      fetch('/api/teachers/:id', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          first_name,
          last_name,
          profile_pic,
          address,
          phone_number
        })
      })
      .then(resp => {
        resp.json()
        if(resp.ok){
          navigate('/home')
        } else {
          alert('Cannot navigate to Home')
        }
      })
    } else {
      fetch('/api/students/:id', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          first_name,
          last_name,
          profile_pic,
          address,
          phone_number
        })
      })
      .then(resp => {
        resp.json()
        if(resp.ok){
          navigate('/home')
        } else {
          alert('Cannot navigate to Home')
        }
      })
    }
    
  }

  
  return (
  
    <Container>
      <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
             {user ? `Welcome to Rostrum, {user.email}` : 'Welcome to Rostrum!'}
            </Typography>
            <Box component="form" noValidate onSubmit={(e) => updateProfile(e, profileData)} sx={{ mt: 1 }}>
            {user ? <img src={user.profile_pic} /> : null}
            <input
              accept="image/*"
              // style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
            />
              <TextField
                margin="normal"
                required
                fullWidth
                id="first_name"
                label="First Name"
                name="first_name"
                onChange={(e) => handleData(e)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="last_name"
                label="Last Name"
                id="last_name"
                onChange={(e) => handleData(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="address"
                label="Address"
                id="address"
                onChange={(e) => handleData(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone_number"
                label="Phone Number (xxx-xxx-xxxx)"
                id="phone_number"
                onChange={(e) => handleData(e)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
    </Container>
  )
}