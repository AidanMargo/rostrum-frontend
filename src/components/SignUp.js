import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { DirectUpload } from 'activestorage'


export default function SignUp () {

  const navigate = useNavigate()

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    avatar: {},
    phone_number: ''
  })

  // Handler Functions
  const handleData = (e) => {
    setSignUpData({...signUpData, [e.target.name]:e.target.value})
  }
  

  // const uploadFile = (file, user) => {
  //   const upload = new DirectUpload(file, '/rails/active_storage/direct_uploads')
  //   upload.create((error, blob) => {
  //     if (error){
  //       console.log(error)
  //     } else {
  //       debugger
  //     }
  //   })
  // }


  const handleTeacherSignUp = (e, SignUpData) => {
    const {email, password, password_confirmation, first_name, last_name, avatar,
    address, phone_number} = SignUpData
    e.preventDefault()   

    let teacher = {
      email,
      password,
      password_confirmation,
      address,
      phone_number,
      first_name,
      last_name
    }

    fetch('/api/teachers', {
      
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(teacher)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
  }
  

  return (
    <div>

      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* Teacher sign-up form */}
        <Grid
          item
          xs={false}
          lg={8}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1453906971074-ce568cccbc63?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} lg={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up as a Teacher
            </Typography>
            <Box component="form" noValidate onSubmit={(e) => handleTeacherSignUp(e, signUpData)} sx={{ mt: 1 }}>
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => handleData(e)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => handleData(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password_confirmation"
                label="Re-enter Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="login" variant="body1">
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}