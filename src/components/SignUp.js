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
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function SignUp () {

  const navigate = useNavigate()

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    profile_pic: 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
  })

  // Handler Functions
  const handleData = (e) => {
    setSignUpData(prevSignUpData => {
      return {...prevSignUpData, [e.target.name]: e.target.value};
    })
  }

  const handleStudentSignUp = (e, SignUpData) => {
    const {email, password, password_confirmation, profile_pic} = SignUpData
    e.preventDefault()   

    fetch('/api/students', {
      
      method: 'POST',
      headers: {
        // 'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        password_confirmation,
        profile_pic
      })
    })
    .then(resp => {
        resp.json()
        if (resp.ok) {
          navigate('/info')
        } else {
          alert('Nope')
        }
      })
  }


  const handleTeacherSignUp = (e, SignUpData) => {
    const {email, password, password_confirmation, profile_pic} = SignUpData
    e.preventDefault()   

    fetch('/api/teachers', {
      
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        password_confirmation,
        profile_pic,
        type: 'teacher'
      })
    })
    .then(resp => {
        resp.json()
        if (resp.ok) {
          navigate('/info')
        } else {
          alert('Nope')
        }
      })
  }
  

  return (
    <div>

      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} lg={6} component={Paper} elevation={6} square>
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
              Sign Up As a Student
            </Typography>
            <Box component="form" noValidate onSubmit={(e) => handleStudentSignUp(e, signUpData)} sx={{ mt: 1 }}>
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
              <Grid item>
                  <Link href="login" variant="body1">
                    {"Already have an account? Login"}
                  </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>

        {/* Teacher sign-up form */}
        <Grid item xs={12} lg={6} component={Paper} elevation={6} square>
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