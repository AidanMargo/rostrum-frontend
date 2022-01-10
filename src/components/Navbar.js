import {useNavigate} from 'react-router-dom'
import '../componentStyles/navbarStyles.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {pink} from '@mui/material/colors'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {useEffect, useRef} from 'react'
import {gsap} from 'gsap'

function Navbar({setUser, user}) {


  const navRef = useRef();
  const navigate = useNavigate()

  useEffect(() => {
    gsap.to(navRef.current, 1, {opacity: '1', ease: 'Power2.easeInOut'})
  })


  // Custom styles for MUI Components
  const theme = createTheme({
    palette: {
      info: {
       main: pink[100],
      },
      alert: {
        main: '#373737'
      } 
    },
    typography: {
      h5: {
        color: '#ED438A',
        fontSize: '2rem'
      }
    }
  });

  
   // Logout and delete user session
   const logout = (e) => {
    e.preventDefault()

    fetch('/api/logout', {
      method: "DELETE",
      headers: {
        "Content-Type": 'application/json'
      }
    })
    .then(() => {
      setUser(null)
      navigate('/')
    })
    
  }
  // Functions for opening/closing the side panel
  function openMenu() {
    document.getElementById("mySidepanel").style.width = "250px";
  }

  function closeMenu() {
    document.getElementById("mySidepanel").style.width = "0px";
  }
  return (
    
    <div className='navbar' ref={navRef}>
    
      <div id="mySidepanel" className="sidepanel">
        <a href="javascript:void(0)" class="closebtn" onClick={() => closeMenu()}>&times;</a>
        <a href="/home">My Dashboard</a>
        <a href="/students">Students</a>
        <a href="/appointments">Appointments</a>
      </div>
    <navbar>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          <AppBar position="static" style={{ background: '#373737' }}>
            <Toolbar >
              {user && 
              <IconButton
                size="large"
                edge="start"
                color="info"
                aria-label="menu"
                className="menu-btn"
                sx={{ mr: 2 }}
                onClick={() => openMenu()}
              >
                <MenuIcon sx={{color: '#f8bbd0'}}/> 
                </IconButton>}
                <Typography  variant="h5" component="h5" sx={{ flexGrow: 1 }}>
                  Rostrum
                </Typography>
                { user ? <Button href= '/'color="inherit" onClick={(e) => logout(e)}>Logout</Button> :
                <>
                  <Button href='login' color="inherit">Login</Button> 
                  <Button href= 'signUp'color="inherit">Sign Up</Button>
                </> }
                
              </Toolbar>
            </AppBar>
          </Box>
        </ThemeProvider>
      </navbar>
    </div>
  )
}

export default Navbar