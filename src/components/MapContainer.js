import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {
  
  const mapStyles = {        
    height: "70vh",
    width: "100%"
    // gridrow: '1/3'
  };
  
  const defaultCenter = {
    lat: 32.7767, lng: -96.7970
  }
  
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyA1DrpRSV5V-3Tq5WaVG777aVzkSDAAr7c'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        />
     </LoadScript>
  )
}

export default MapContainer;