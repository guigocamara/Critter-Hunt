import React from 'react'
import Map from '../components/MapSection';

const location = {
  address: 'UCF',
  lat: 28.602869503700095,
  lng: -81.20011172453141,
}

// convert address to coordinates function...

const MapsPage = () =>
{
    return(
      <div>
        <div>
            
        </div>
        <Map location={location} zoomLevel={10}/>
      </div>
    );
};

export default MapsPage;