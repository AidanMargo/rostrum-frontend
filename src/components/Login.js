import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
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


export default function Login ({user}) {

  // States
  const [showAlert, setShowAlert] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  // Handler Functions
  const handleData = (e) => {
    setLoginData(prevLoginData => {
      return {...prevLoginData, [e.target.name]: e.target.value};
    })
  }

  // Navigate to new page
  const navigate = useNavigate()

  const openAlert = () => {
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 7000)
  }
  

  // Login, or show alert
  const handleTeacherLogin = (e, loginData) => {
    const {email, password} = loginData
    e.preventDefault()   

    fetch('/api/teacherlogin', {
      
      method: 'POST',
      headers: {
        // 'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(resp => {
        resp.json()
        if (resp.ok) {
          navigate('/home')
          window.location.reload()
        } else {
          openAlert()
        }
      })
  }


  
  return (
    <div>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} lg={3} component={Paper} elevation={6} square>
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
              Sign in 
            </Typography>
            <Box component="form" noValidate onSubmit={(e) => handleTeacherLogin(e, loginData)} sx={{ mt: 1 }}>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
                <Grid item>
                  <Link href="signUp" variant="body1">
                    {"Don't have an account? Sign Up"}
                  </Link>
              </Grid>
            </Box>
          </Box>
         {showAlert && <Alert severity="error">Invalid Username or Password.</Alert>} 
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          lg={9}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1593697972679-c4041d132a46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </div>

  )
}