import  Box  from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import { DirectUpload } from 'activestorage'


export default function UserInfo({user, setUserAvatar}) {

  const navigate = useNavigate()

  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    phone_number: '',
    avatar: {}
  })

  const handleData = (e) => {
    if(e.target.name === 'avatar'){
      console.log(e.target.files[0])
      setProfileData({...profileData, [e.target.name]:e.target.files[0]})
    }else{
    setProfileData({...profileData, [e.target.name]:e.target.value})
    }
  }

const uploadFile = () => {}

  const updateProfile = (e, profileData) => {
    const {first_name, last_name, avatar, address, phone_number} = profileData
    e.preventDefault()

      fetch('/api/teachers/:id', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          first_name,
          last_name,
          address,
          phone_number,
          avatar
        })
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        uploadFile(data.avatar, data)
      })
      

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
            {user ? <img alt='profile' src={user.profile_pic} /> : null}
            <input type="file"
               margin="normal"
               accept="image/*"
               name="avatar"
               label='Image'
               fullWidth
               onChange={(e) => handleData(e)}
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