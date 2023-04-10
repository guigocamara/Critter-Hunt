import React from 'react'
import GoogleMapReact from 'google-map-react'
import Geocode from 'react-geocode'
//import './map.css'
import { Icon } from '@iconify/react'
import Modal from './Modal'


let apiKey = 'AIzaSyDJfd1QdAaC7kcziP2wamEwZ5od_o7xCRU';
Geocode.setApiKey(apiKey);
Geocode.setLanguage('en');


// converts address to coordinates and adds pin to map
function addAddress(critter_name, address) {
  Geocode.fromAddress(address).then( 
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    (error) => {
      console.error(error);
    }
  );
  console.log(critter_name);
}


const Map = ({ location, zoomLevel }) => (
    <div className="map">
      <h2  class="uppercase text-base p-2 text-center font-normal text-xl ">View your Critters!</h2>
      <button id="critter-button" onClick={() => addAddress("bob", "UCF")} type='button' class="right-0">Add a critter!</button>
      <br></br>
      <Modal></Modal>
      <div class='h-screen'>
        <GoogleMapReact id="map"
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
)

const LocationPin = ({ text }) => (
    <div class="flex-1 items-center w-40">
        <Icon icon= "mdi-light:home" class="text-6xl" />
            <p class="text-xl">{text}</p>
    </div>
)

export default Map