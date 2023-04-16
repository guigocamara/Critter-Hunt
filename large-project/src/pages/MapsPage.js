import React from 'react'
import Map from '../components/MapSection';
import NavBar from '../components/NavBar';
import AllPosts from '../components/AllPosts';

const location = {
  address: 'UCF',
  lat: 28.602869503700095,
  lng: -81.20011172453141,
}

// convert address to coordinates function...


export default function MapsPage()
{
    return(
      <div className="h-screen">
        <NavBar></NavBar>
        
        <div className="flex flex-row h-full">
          <AllPosts></AllPosts>
          <Map location={location} zoomLevel={10}/>
        </div>  
      </div>
    );
};