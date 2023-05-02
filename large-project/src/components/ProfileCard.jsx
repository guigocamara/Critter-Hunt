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
            let response = await fetch(`https://critterhunt.herokuapp.com/api/datejoined/${userID}`);
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

        <div className='h-screen grid place-items-center bg-gradient-to-r to-[#57b846] from-[#f7dc12]'>

            <div className='w-1/2 rounded-lg flex grid place-items-center bg-white outline mb-20'>

                <div className='grid place-items-center flex'>
                    <img src="https://www.cs.ucf.edu/wp-content/uploads/2022/04/Richard-Leinecker622edit-scaled.jpg" 
                    className='w-1/2 rounded-full'/> 
                </div>
                

                <div className='bg-slate-100 grid place-items-left rounded-lg space-y-5 flex w-full'>

                    <div className='flex'>
                        <Icon icon="ph:bug-bold"/> 
                        <div className='pl-2 pr-3 flex space-x-2'><div className='text-green-600'>Critter Hunter: </div> <div className='underline font-medium hover:text-sky-400'>{ud.username}</div> </div> 
                    </div>

                    <div className='flex'>
                        <Icon icon="mdi:counter"/>
                    <div className='pl-2 pr-3 flex space-x-2'> <div className='text-green-600'>Critters Caught:</div>  <div className='underline font-medium hover:text-sky-400'>{postsList.length} </div> </div> 
                    </div>

                    <div className='flex'>
                        <Icon icon="mdi:clock-time-eight"/> 
                    <div className='pl-2 pr-3 flex space-x-2'> <div className='text-green-600'>Date Joined:</div> <div className='underline font-medium hover:text-sky-400'>{dateJoined}</div> </div>
                    </div>

                    <div className='flex'>
                        <Icon icon="icon-park:ranking"/>
                        <div className='pl-2 pr-3 flex space-x-2'> <div className='text-green-600'>Current Rank:</div> <div className='underline font-medium hover:text-sky-400'>{rank}</div></div> 
                    </div>
                </div>
            </div>
            
            <div className='w-7/12 bg-black absolute rounded'>
                
            </div>
                <div className='bg-white bg-opacity-70 w-1/2 outline rounded'>
                    <MDBCardBody className="text-black p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <MDBCardText className="lead fw-normal mb-0 text-2xl"> Critters </MDBCardText>
                        </div>
                        <div className="g-2 grid grid-cols-3">
                            {postsList.map(post => {
                                return (
                                    <div className="mb-2 mr-2 relative">
                                        


                                        <div className='mb-2'> 
                                            {post.author == userID &&
                                            <div> 
                                                <div className='w-full h-full mt-0 ml-0 bg-black bg-opacity-60 text-white rounded-lg flex flex-col items-center justify-center mb-1'>
                                                    <div>{post.crittername}</div>
                                                </div>

                                                <img src={`http://critterhunt.herokuapp.com/image/${post.picture}`}
                                                alt="image 1" className="w-full rounded-lg" /> 
                                            </div>
                                            }
                                            <div className='h-15 mb-3 grid place-items-center'>
                                                <button type='button' onClick={() => deletePost(post._id)} className='bg-black mt-1 flex hover:bg-red-600'><Icon icon="ic:round-delete" className='mt-1 mr-1'/>DELETE</button>
                                            </div>
                                        </div>
                                    </div>
                                        )})}
                        </div>
                    </MDBCardBody>
                </div>
        </div>

        

    );
}


export default ProfileCard;