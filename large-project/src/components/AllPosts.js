import React, { useState } from "react";
import { Icon } from '@iconify/react'


export default function AllPosts({postsList}){
    var bp = require('../components/Path.js');

    const addLikes = async event => {
        event.preventDefault();
        var storage = require('../tokenStorage.js');
        var obj = { userId: userId, card: card.value, jwtToken: storage.retrieveToken() };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(bp.buildPath('api/updatepost'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            var txt = await response.text();
            var res = JSON.parse(txt);
            if (res.error && res.error.length > 0) {
                setMessage("API Error:" + res.error);
            }
            else {
                
            }
        }
        catch (e) {
            setMessage(e.toString());
        }
    }


    return(
    <div className="w-4/12 flex flex-col bg-[#57B846] items-center">
        <div className="h-full w-full flex flex-col items-center overflow-y-scroll">

        {postsList.map(post => {
            return(
            <div className="m-5 h-full w-80 bg-white rounded">
                <div className="h-10 text-sm mt-3 ml-3 mr-3"> 
                    <div>{post.crittername}</div>
                    <div>{}</div>
                </div>

                <img className="w-80 h-80" src={`http://critterhunt.herokuapp.com/image/${post.picture}`}/>
    
                <div className="h-15 text-sm mb-3 ml-3 mr-3 flex items-center">
                    <div className="flex flex-col items-center" onClick={addLikes(post._id, post.likes)}>
                        <Icon className="h-10 w-10" icon="material-symbols:star-rounded"/>
                        <div>{post.likes}</div>
                    </div>
                </div>
            </div>    
            )
        })}
                        
        </div>
    </div>
    );
}