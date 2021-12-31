import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import Geocode from 'react-geocode'
import {useState, useEffect} from 'react'

const MapContainer = ({user:{address}, google, locations=[]}) => {
   
  const [lat, setLat] = useState(5)
  const [lng, setLng] = useState(5)
  // Change user address to lat/long coordinates
  useEffect(() => {
      Geocode.setApiKey("AIzaSyAOM_osGewNehPiY35iiyWR8pkMW0qrE50");
        Geocode.setLanguage("en");
        Geocode.setLocationType("ROOFTOP");
        Geocode.setRegion("us");

      Geocode.fromAddress(address).then(
      (response) => {
          console.log(response)
          const lt = response.results[0].geometry.location.lat;
          const lg = response.results[0].geometry.location.lng;
        setLat(lt)
        setLng(lg)
      })

  }, [])

// Object with latitude and longitude of user address
  const userCoords = {
    lat,
    lng
  }


  // This gets the location thats entered into the search bar and gets latitude and longitude
// getGeocode = async function(location) {
//   let address = location.address.split(" ").join("+")
//   let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAOM_osGewNehPiY35iiyWR8pkMW0qrE50`
//   console.log(url)
//   const response = await axios.get(url)
//   const data = response.data.results[0]
//   const coords = {
//     name: data.formatted_address,
//     location: {
//       lat: data.geometry.location.lat,
//       lng: data.geometry.location.lng
//     }
//   }
//   return coords
//  }

  // This is the form for the search component
{/* <form onSubmit={this.handleSubmit}>
          <input type="text" name="address" onChange={this.inputChange} />
          <input type="submit" value="Check Location" />
        </form>
handleSubmit = event => {
      event.preventDefault();
      // const navigate = useNavigate();

      this.getGeocode(this.state.location).then(coords => {
        // console.log(coords.location.lat)
        
        this.setState({
          ...this.state,destinations: [...this.state.destinations, coords]
       })}
      ) */}



  return (
   <>
   {/* <button onClick={() => geocode(address)}>Geocode</button> */}
     <Map
          google={google}
          containerStyle={{
              // position: "static",
              width: "100%",
              height: "70vh"
          }}
          style={{
              width: "50%",
              height: "70vh"
          }}
          center={userCoords}
          initialCenter={userCoords}
          zoom={locations.length === 1 ? 18 : 13}
          disableDefaultUI={true}
      >
        
          <Marker position={userCoords}/>


        </Map>
        
        </>

  )
}

// export default MapContainer

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA1DrpRSV5V-3Tq5WaVG777aVzkSDAAr7c'
})(MapContainer);
