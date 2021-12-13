import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {useSelector, useDispatch} from 'react-redux'
import {isLogged} from '../actions'

function Navbar() {
  const loggedIn = useSelector(state => state.isLogged)
  const dispatch = useDispatch()

  const theme = createTheme({
    palette: {
      info: {
       main: '#373737',
      },
      navbar: {
        backgroundColor: 'aliceblue'
      },
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color={'info'}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => dispatch(isLogged())}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Rostrum
            </Typography>
            {/* {!user ? */}
            <Button href='login' color="inherit">Login</Button> 
            <Button href= 'signUp'color="inherit">Sign Up</Button> 
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  )
}

export default Navbar