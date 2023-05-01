import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

import { MDBCol, 
    MDBContainer, 
    MDBRow, 
    MDBCard, 
    MDBCardText, 
    MDBCardBody, 
    MDBCardImage, 
    MDBBtn, 
    MDBTypography } from 'mdb-react-ui-kit';

function ProfileCard() {

    const [postsList, setPostsList] = useState([]);
    const [dateJoined, setDateJoined] = useState(null);
    const [rank, setRank] = useState(null);
    var bp = require('../components/Path.js');
    var _ud = localStorage.getItem('user_data');
    const jwt = require("jsonwebtoken");
    // console.log("user data is....");
    // console.log(localStorage.getItem('user_data'));
    var ud = JSON.parse(_ud);
    var userID = ud.userID;
    //console.log(userID);
    // var du = jwt.decode(token,{complete:true});
    // var huh = du.payload.pa;
    // console.log(huh);




    useEffect(() => {
        // Update the document title using the browser API
        searchPosts();
        getRank();
        fetchDate();
      },[]);
  
      const searchPosts = async event => {
        //console.log("invoked");

        var storage = require('../tokenStorage.js');
        var obj = { search: "", jwtToken: storage.retrieveToken() };
        var js = JSON.stringify(obj);
        //console.log(obj.jwtToken.dateJoined);
        try {
            const response = await fetch(bp.buildPath('api/searchposts'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            //console.log(response);
            var txt = await response.text();
            var res = JSON.parse(txt);
            var _results = res;
            
            const posts = new Array();

            for (var i =0; i < _results._ret.length; i++){
                if (_results._ret[i].author == userID) {
                    posts.push(_results._ret[i]);
                }
            }
            
            setPostsList(posts);
        } catch (e) {
            console.log(e.toString());
            storage.storeToken(res.jwtToken);
        }
      };

      const fetchDate = async event => {

        var obj = { search: "", jwtToken: "", userId: userID };
        var js = JSON.stringify(obj);

        //setDateJoined("June 87, 2305");

        try {
            let response = await fetch(`http://critterhunt.herokuapp.com/api/datejoined/${userID}`);
            var txt = await response.json();
            console.log(txt);
            setDateJoined(txt.dateJoined);
        } catch (e) {
            console.log(e);
        }
      }

      const getRank = async event => {

        try {
            const response = await fetch(bp.buildPath('api/users/rank'));
            const txt = await response.json();
            const user = txt.find(user => user._id === userID);
            //console.log("sojfkoajf....")
            console.log(txt);
            const userRank = txt.findIndex(user => user._id === userID) + 1;
            setRank(userRank);

            
        } catch (e) {
            console.log(e);
            //console.log(e.toString());

        }
      };

      // delete post
      async function deletePost(postID) {
        //console.log("deleting posts...");
        console.log(typeof postID);

        var obj = { PostsId: postID };
        var js = JSON.stringify(obj);
        console.log(js);


        try {
            const response = await fetch(bp.buildPath('api/deletepost'),
                { method: 'DELETE', body: js, headers: { 'Content-Type': 'application/json' } });
            //console.log(response);
            var txt = await response.json();
            console.log(txt);

            searchPosts(); // reload the posts
        } catch (e) {
            console.log(e);

        }

      };
      

      return (

        <div className='h-screen grid place-items-center bg-neutral-300'>

            <div className=''>
                <div className='w-auto rounded-lg flex grid place-items-center'>

                    <div className='grid place-items-end flex pr-1 '>
                        <img src="https://www.cs.ucf.edu/wp-content/uploads/2022/04/Richard-Leinecker622edit-scaled.jpg" 
                        className='w-1/4 rounded-full outline'/> 
                    </div>
                    

                    <div className='bg-slate-50 grid place-items-left rounded-lg space-y-5 flex w-1/2 outline'>

                        <div className='flex'>
                            <Icon icon="ph:bug-bold"/> 
                            <div className='pl-2 pr-3'>Critter Hunter: {ud.username} </div> 
                        </div>

                        <div className='flex'>
                            <Icon icon="mdi:counter"/>
                        <div className='pl-2 pr-3'>Critters Caught: {postsList.length}</div> 
                        </div>

                        <div className='flex'>
                            <Icon icon="mdi:clock-time-eight"/> 
                        <div className='pl-2 pr-3'>Date Joined: {dateJoined}</div>
                        </div>

                        <div className='flex'>
                            <Icon icon="icon-park:ranking"/>
                            <div className='pl-2 pr-3'>Current Rank: {rank}</div> 
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-slate-50 bg-opacity-70 w-1/2'>
                <MDBCardBody className="text-black p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <MDBCardText className="lead fw-normal mb-0">Critters</MDBCardText>
                    </div>
                    <div className="g-2 grid grid-cols-3">
                        {postsList.map(post => {
                            return (
                                <div className="mb-2 mr-2 relative">
                                    {/* <div className='absolute w-full h-full mt-0 ml-0 bg-black bg-opacity-0 text-white rounded-lg flex flex-col items-center justify-center hover:bg-opacity-60'>
                                        <div>{post.crittername}</div>
                                    </div> */}


                                    <div className='mb-2'> 
                                        {post.author == userID &&
                                        <img src={`http://critterhunt.herokuapp.com/image/${post.picture}`}
                                        alt="image 1" className="w-full rounded-lg" />
                                        }
                                        <div className='h-15 mb-3 flex items-center'>
                                             <button type='button' onClick={() => deletePost(post._id)}><Icon icon="material-symbols:delete-forever-rounded"/></button>
                                        </div>
                                    </div>
                                </div>
                                    )})}
                        {/* { jsonArray.map(array => {
                                return (
                                    <div className="mb-2 mr-2 relative">
                                        <div className='absolute w-full h-full mt-0 ml-0 bg-black bg-opacity-0 text-white rounded-lg flex flex-col items-center justify-center hover:bg-opacity-60'>
                                            <div className=''>{array.critter_name}</div>
                                        </div>
                                        <img src={array.image}
                                        alt="image 1" className="w-full rounded-lg" />
                                        
                                        <div className='h-15 mb-3 flex items-center'>
                                             <button type='button' onClick={() => deletePost('54545')}><Icon icon="material-symbols:delete-forever-rounded"/></button>
                                
                                        </div>
                                    </div>
                                )
                            })} */}
                    </div>
                </MDBCardBody>

            </div>
        </div>

        

    );
}


export default ProfileCard;