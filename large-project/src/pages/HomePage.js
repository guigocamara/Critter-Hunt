import React, { useState, useEffect } from 'react'
import Map from '../components/MapSection';
import NavBar from '../components/NavBar';
import AllPosts from '../components/AllPosts';

const location = {
  address: 'UCF',
  lat: 28.602869503700095,
  lng: -81.20011172453141,
}



export default function HomePage()
{
    let searchInput = '';
    const [postsList, setPostsList] = useState([]);
    var bp = require('../components/Path.js');

    const handleChange = (e) => {
        searchPosts();
    };

    useEffect(() => {
      // Update the document title using the browser API
      searchPosts();
    });

    const searchPosts = async event => {
        var storage = require('../tokenStorage.js');
        var obj = { search: searchInput.value, jwtToken: storage.retrieveToken() };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(bp.buildPath('api/searchposts'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            var txt = await response.text();
            var res = JSON.parse(txt);
            var _results = res;

            setPostsList(_results._ret);
        }
        catch (e) {
            console.log(e.toString());
            storage.storeToken(res.jwtToken);
        }
    };

    return(
      <div className="h-screen">
        <NavBar></NavBar>
        <div className="flex justify-center w-full bg-[#57B846]">
          <input className="w-4/6 h-10 rounded p-2 mb-4" type="text" placeholder="Search for posts!" onChange={handleChange} value={searchInput.value} ref={(c) => searchInput = c}/>
        </div>
        <div className="flex flex-row h-full">
          <AllPosts postsList = {postsList}></AllPosts>
          <Map postsList={postsList} location={location} zoomLevel={15}/>
        </div>  
      </div>
    );
};