import React, { useState } from "react";
import { Icon } from '@iconify/react'







export default function AllPosts(){
    let searchInput = '';
    const [postsList, setPostsList] = useState([]);
    var bp = require('../components/Path.js');

    const handleChange = (e) => {
        console.log(searchInput.value);
        //fetch all the posts from the database.
        searchPosts();
        console.log(postsList);
        //Call the search api!
    };

    const searchPosts = async event => {
        var storage = require('../tokenStorage.js');
        var obj = { search: searchInput.value };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(bp.buildPath('api/searchposts'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            var txt = await response.text();
            var res = JSON.parse(txt);
            var _results = res.results;

            setPostsList(_results);
        }
        catch (e) {
            console.log(e.toString());
        }
    };

    return(
    <div class="w-4/12 flex flex-col bg-[#57B846] items-center">
        <input class="w-5/6 h-10 rounded p-2" type="text" placeholder="Search for posts!" onChange={handleChange} value={searchInput} ref={(c) => searchInput = c}/>
        <div class="h-full w-full flex flex-col items-center overflow-y-scroll">
        <div class="m-5 h-96 w-80 bg-white rounded">
                <div class="h-2/12 text-sm mt-3 ml-3 mr-3"> 
                    <div>Jacob Rosen</div>
                    <div>Critter: Horse</div>
                </div>
                <div class="h-8/12 text-sm">
                    <img src={"https://cdn.britannica.com/96/1296-050-4A65097D/gelding-bay-coat.jpg"}/>
                </div>
                <div class="h-4/12 text-sm mb-3 ml-3 mr-3">
                    <Icon icon="mdi:cards-heart"/>
                    The comments
                </div>
            </div>    
                
        </div>
    </div>
    );
}