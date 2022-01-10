import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import Geocode from 'react-geocode'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import {useState, useEffect} from 'react'
import '../componentStyles/mapStyles.css'

const MapContainer = ({user:{address}, google, locations=[]}) => {
  
  // State variables
  const [location, setLocation] = useState('')
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  })
  const [destinations, setDestinations] = useState([])
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)

  // Change user address to lat/long coordinates on load
  useEffect(() => {
      Geocode.setApiKey("AIzaSyAOM_osGewNehPiY35iiyWR8pkMW0qrE50");
        Geocode.setLanguage("en");
        Geocode.setLocationType("ROOFTOP");
        Geocode.setRegion("us");

      Geocode.fromAddress(address).then(
      (response) => {
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


  // Gets the location thats entered into the search bar and gets latitude and longitude, then sets state
  const handleSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setDestinations([...destinations, latLng])
    setLocation(address);
    setCoordinates(latLng);
  }
 
  return (
   <>

    <div className='autocomplete'>
    <PlacesAutocomplete value={location} onChange={setLocation} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input {...getInputProps({ placeholder: "Type address" })} />

          <div className='places'>
            {loading ? <div>...loading</div> : null}

            {suggestions.map(suggestion => {
              const style = {
                backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                opacity:  0.8
              };

              return (
                <div {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  </div>
  <div className="map">
    <Map
      google={google}
      style={{
          width: "70%",
          height: "70vh"
      }}
      center={coordinates.lat && coordinates.lng ? coordinates : userCoords}
      initialCenter={userCoords}
      zoom={coordinates.lat && coordinates.lng ? 15 : 13}
      disableDefaultUI={true}>
      <Marker position={userCoords}/>

        {destinations.map(destination => <Marker position={destination}/>)}

      </Map>
    </div>  
  </>
  )}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA1DrpRSV5V-3Tq5WaVG777aVzkSDAAr7c'
})(MapContainer);
