import React, { useState } from "react";
import { Icon } from '@iconify/react'







export default function AllPosts(){
    let searchInput = '';
    const [postsList, setPostsList] = useState([]);
    var bp = require('../components/Path.js');

    const handleChange = (e) => {
        searchPosts();
    };

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
    <div className="w-4/12 flex flex-col bg-[#57B846] items-center">
        <input className="w-5/6 h-10 rounded p-2" type="text" placeholder="Search for posts!" onChange={handleChange} value={searchInput.value} ref={(c) => searchInput = c}/>
        <div className="h-full w-full flex flex-col items-center overflow-y-scroll">

        {postsList.map(post => {
            console.log(post.crittername);
            return(
            <div className="m-5 h-96 w-80 bg-white rounded">
                <div className="h-2/12 text-sm mt-3 ml-3 mr-3"> 
                    <div>{post.crittername}</div>
                    <div>{}</div>
                </div>
                <div className="h-8/12 text-sm">
                    <img src={"https://cdn.britannica.com/96/1296-050-4A65097D/gelding-bay-coat.jpg"}/>
                </div>
                <div className="h-4/12 text-sm mb-3 ml-3 mr-3">
                    <Icon icon="mdi:cards-heart"/>
                    The comments
                </div>
            </div>    
            )
        })}
                        
        </div>
    </div>
    );
}