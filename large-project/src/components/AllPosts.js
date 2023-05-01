import React, { useState } from "react";
import { Icon } from '@iconify/react'


export default function AllPosts({postsListAllPosts, setLikesUpdate, likesUpdate}){
    var bp = require('../components/Path.js');

    const updatePost = async (postId, postLikes, event) => {
        setLikesUpdate(true);
        var obj = { postsId: postId, newLikes: postLikes + 1, newComments: [] };
        //var storage = require('../tokenStorage.js');
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(bp.buildPath('api/updatepost'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            var txt = await response.text();
            var res = JSON.parse(txt);
            if (res.error && res.error.length > 0) {
                //console.log("error1");
            }
            else {
                //console.log("success");
            }
        }
        catch {
            //console.log("error2");
        }
    }

    const [rotateChevron, setRotateChevron] = useState(false);

    const handleRotate = () => setRotateChevron(!rotateChevron);

    const rotate = rotateChevron ? "rotate(360deg)" : "rotate(0)"

    
    return(
    <div className="w-4/12 flex flex-col bg-[#57B846] items-center">
        <div className="h-full w-full flex flex-col items-center overflow-y-scroll">

        {postsListAllPosts.map(post => {
            return(
            <div key={post._id} className="m-5 w-80 bg-white rounded">
                <div className="h-10 text-sm mt-3 ml-3 mr-3"> 
                    <div>{post.crittername}</div>
                    <div>{}</div>
                </div>

                <img className="w-80 h-80" alt="" src={`https://critterhunt.herokuapp.com/image/${post.picture}`}/>
    
                <div className="h-15 text-sm mb-3 ml-3 mr-3 flex items-center">
                    <div className="flex flex-col items-center" onClick={() => {updatePost(post._id, post.likes)}}>
                        <Icon style={{ transform: rotate, transition: "all .5s linear" }} color="#f7dc12" className="h-10 w-10" icon="material-symbols:star-rounded" onClick={() => {handleRotate()}}/>
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