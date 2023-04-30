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
    //let searchInput = '';
    let [searchInput, setSearchInput] = useState('');
    const [postsListMap, setPostsListMap] = useState([]);
    const [postsListAllPosts, setPostsListAllPosts] = useState([]);
    const [pinSelected, setPinSelected] = useState(false);
    const [likesUpdate, setLikesUpdate] = useState(false);
    var bp = require('../components/Path.js');

    const handleChange = (e) => {
        setSearchInput(e.target.value);
        setPinSelected(false);
        searchPosts();
    };

    useEffect(() => {
      // Update the document title using the browser API
      if(!pinSelected){
        searchPosts();
      }
    }, [pinSelected, searchInput, likesUpdate]);

    const searchPosts = async event => {
        var storage = require('../tokenStorage.js');
        var obj = { search: searchInput, jwtToken: storage.retrieveToken() };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(bp.buildPath('api/searchposts'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            var txt = await response.text();
            var res = JSON.parse(txt);
            var _results = res;

          
            setPostsListMap(_results._ret);
            setPostsListAllPosts(_results._ret);
            
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
          <input className="w-4/6 h-10 rounded p-2 mb-4" type="text" placeholder="Search for posts!" onChange={handleChange} value={searchInput}/>
        </div>
        <div className="flex flex-row h-full">
          <AllPosts postsListAllPosts = {postsListAllPosts} setLikesUpdate={setLikesUpdate} likesUpdate={likesUpdate}></AllPosts>
          <Map setPostsListAllPosts={setPostsListAllPosts} setPinSelected={setPinSelected} pinSelected={pinSelected} postsListMap={postsListMap} location={location} zoomLevel={15}/>
        </div>  
      </div>
    );
};