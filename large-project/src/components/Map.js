import { useMemo } from 'react';
import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

function Map() {

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyDJfd1QdAaC7kcziP2wamEwZ5od_o7xCRU" // should hide this key later...
    });


    if (isLoaded)
        return (<GoogleMap zoom={10} center={{lat: 28.602869503700095, lng: -81.20011172453141}}>
        </GoogleMap>);
    else
        return (<div>
        Loading...</div>);
}

export default Map;