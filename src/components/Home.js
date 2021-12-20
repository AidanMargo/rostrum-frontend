import '../componentStyles/homeStyles.css'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

function Home ({user}) {


  return (
    <>
    { user && 
    <>
    <Grid container>
      <Grid item>
      <Card />  
      </Grid>


    </Grid>
    
    </>
    }
    </>
  )
}

export default Home