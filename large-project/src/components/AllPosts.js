import React from "react";
import { Icon } from '@iconify/react'


export default function AllPosts({postsList}){

    return(
    <div className="w-4/12 flex flex-col bg-[#57B846] items-center">
        <div className="h-full w-full flex flex-col items-center overflow-y-scroll">

        {postsList.map(post => {
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