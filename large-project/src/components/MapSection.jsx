import React, {useState, useEffect} from "react";
import GoogleMapReact from 'google-map-react'
import Geocode from 'react-geocode'
//import './map.css'
import { Icon } from '@iconify/react'
//import Modal from './Modal'


let apiKey = 'AIzaSyDJfd1QdAaC7kcziP2wamEwZ5od_o7xCRU';
Geocode.setApiKey(apiKey);
Geocode.setLanguage('en');


// converts address to coordinates and adds pin to map
// function addAddress(critter_name, address) {
//   console.log("entered");
//   Geocode.fromAddress(address).then( 
//     (response) => {
//       const { lat, lng } = response.results[0].geometry.location;
//       console.log(lat, lng);
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
// }


export default function Map ({ setPostsListAllPosts, setPinSelected, pinSelected, postsListMap, location, zoomLevel }) {
  const [selectedPin, setSelectedPin] = useState("");

  return(
      <div className='h-full w-8/12'>
        <GoogleMapReact id="map"
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          { postsListMap.map(post => {
              return(
                <LocationPin
                key={post._id}
                lat={post.location[0]}
                lng={post.location[1]}
                text={post.crittername}
                setPostsListAllPosts={setPostsListAllPosts}
                setPinSelected={setPinSelected}
                setSelectedPin={setSelectedPin}
                selectedPin={selectedPin}
                pinSelected={pinSelected}
                />
              );
            })
          }
        </GoogleMapReact>
      </div>
  );
}

function LocationPin({ text, setPostsListAllPosts, setPinSelected, setSelectedPin, selectedPin, pinSelected }){
    var bp = require('../components/Path.js');
    const [pinColor, setPinColor] = useState("#138808");

    useEffect(() => {
      if(selectedPin == text && pinSelected){
        setPinColor("C00");
      }else{
        setPinColor("#138808");
      }

    });

    const searchPosts = async event => {
  
      var storage = require('../tokenStorage.js');
      var obj = { search: text, jwtToken: storage.retrieveToken() };
      var js = JSON.stringify(obj);
      try {
          const response = await fetch(bp.buildPath('api/searchposts'),
              { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
          var txt = await response.text();
          var res = JSON.parse(txt);
          var _results = res;
          setPinSelected(true);
          setPostsListAllPosts(_results._ret);
          setSelectedPin(text);
      }
      catch (e) {
          console.log(e.toString());
          storage.storeToken(res.jwtToken);
    }
  }


  return(
    <div className="flex flex-col items-center w-40">
        <Icon icon= "ic:baseline-place" className="text-6xl" color={pinColor} onClick={() => {{searchPosts()}}} />
            <p className="text-xl">{text}</p>
    </div>
  );
}

// function Modal() {
  
//   const [modal, setModal] = useState(false);

//   const toggleModal = () => {
//     setModal(!modal);
//   };

//   if(modal) {
//     document.body.classList.add('active-modal')
//   } else {
//     document.body.classList.remove('active-modal')
//   }

//   return (
//     <>
//       <button onClick={toggleModal} class="block text-lg pt-25 pb-25 pr-50 pl-50 mt-100 mb-0 mx-auto">
//       Add a Critter!
//       </button>

//       {modal && (
//         <div class="w-screen h-screen top-0 left-0 right-0 bottom-0  place-content-center">
//           <div onClick={toggleModal} class="w-screen h-screen top-0 left-0 right-0 bottom-0 fixed bg-emerald-50/50"></div>
//           <div class="absolute top-1/2  left-1/2 bg-green-900/50">
//             <h2>Address Information</h2>
//             <br></br>
//             <input id="address-line-1" placeholder="Address Line 1"></input>
//             <br></br>
//             <br></br>
//             <input id="city" placeholder="City"></input>
//             <br></br>
//             <br></br>       
//             <input id="state" placeholder="State"></input>   
//             <br></br>
//             <br></br>
//             <input id="zip-code" placeholder="Zip Code"></input>
//             <br></br>
//             <br></br>
//             <input id="critter-name" placeholder="Critter Name"></input>
//             <br></br>
//             <br></br>
//             <button class="bottom-auto" onClick={() => {toggleModal();
//             addAddress(printValues().critterName, printValues().conatString);
//             console.log(printValues().conatString); }}>Submit</button>
//           </div>
//         </div>
//       )}
//     </>
//   );

  
// }

// function printValues() {
//   const address = document.getElementById("address-line-1").value;
//   const city = document.getElementById("city").value;
//   const state = document.getElementById("state").value;
//   const zipCode = document.getElementById("zip-code").value;
//   const critterName = document.getElementById("critter-name").value;

//   const conatString = address + ' ' + city + ' ' + state + ' ' + zipCode;

//   return {critterName, conatString};

// }