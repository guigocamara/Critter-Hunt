import React, { useState, useEffect } from 'react'

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
    var ud = JSON.parse(_ud);
    console.log(ud);
    var userID = ud.userID;

    useEffect(() => {
        // Update the document title using the browser API
        searchPosts();
        //getRank();
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
            var txt = await response.text();
            var res = JSON.parse(txt);
            var _results = res;
            //console.log(_results);
            
            const posts = new Array();

            for (var i =0; i < _results._ret.length; i++){
                if (_results._ret[i].author == userID) {
                    posts.push(_results._ret[i]);
                }
            }

            //console.log(posts);
  
            setPostsList(posts);
        } catch (e) {
            console.log(e.toString());
            storage.storeToken(res.jwtToken);
        }
      };

      const getRank = async event => {
        var storage = require('../tokenStorage.js');
        var obj = { search: "", jwtToken: storage.retrieveToken() };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(bp.buildPath('/api/users/rank'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            var txt = await response.json();
            console.log("text" +txt);
        } catch (e) {
            console.log(e.toString());

        }
      };

      // delete post
      

      return (

        <div className='h-screen grid place-items-center bg-gradient-to-r from-emerald-300 to-emerald-500'>


            <div className='w-1/2 bg-black bg-opacity-50 rounded-lg'>
                <img src="https://vetmed.illinois.edu/wp-content/uploads/2021/04/pc-keller-hedgehog.jpg" 
                className='w-1/2 rounded-full block mb-10 ml-10'>
                </img> 

                <div className='bg-slate-50 grid place-items-center rounded-lg max-w-1/2'>
                    <div className=''>Critter Hunter: {ud.username} </div>
                    <br></br>
                    <div className=''>Critters Caught: {postsList.length} </div>
                    <br></br>
                    <div className=''>Date Joined: {} </div>
                    <br></br>
                    <div className=''>Current Rank: {} </div>
                </div>
            </div>

            <div className='bg-slate-50 bg-opacity-70 w-2/3'>
                <MDBCardBody className="text-black p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <MDBCardText className="lead fw-normal mb-0">Critters</MDBCardText>
                    </div>
                    <div className="g-2 grid grid-cols-3">
                        {postsList.map(post => {
                            return (
                                <div className="mb-2 mr-2 relative">
                                    <div className='absolute w-full h-full mt-0 ml-0 bg-black bg-opacity-0 text-white rounded-lg flex flex-col items-center justify-center hover:bg-opacity-60'>
                                        <div>{post.crittername}</div>
                                    </div>


                                    <div className='mb-2'> 
                                        {/* {post.author == userID &&
                                        <img src={`http://critterhunt.herokuapp.com/image/${post.picture}`}
                                        alt="image 1" className="w-full rounded-lg" />
                                        } */}
                                    </div>

                                </div>
                                    )})};
                    </div>
                </MDBCardBody>

            </div>
        </div>

        

    );
}


export default ProfileCard;


// import React, { useState, useEffect } from 'react';
// import { MDBCol, 
//     MDBContainer, 
//     MDBRow, 
//     MDBCard, 
//     MDBCardText, 
//     MDBCardBody, 
//     MDBCardImage, 
//     MDBBtn, 
//     MDBTypography } from 'mdb-react-ui-kit';
// import './profilecard.css';
// import AllPosts from './AllPosts';


// function ProfileCard() {
//     const [postsList, setPostsList] = useState([]);
    

//     let searchInput = '';
//     var bp = require('../components/Path.js');

//     async function searchPosts () {
//         var storage = require('../tokenStorage.js');
//         var obj = { search: searchInput.value, jwtToken: storage.retrieveToken() };
//         var js = JSON.stringify(obj);
//         try {
//             const response = await fetch(bp.buildPath('api/searchposts'),
//                 { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
//             var txt = await response.text();
//             var res = JSON.parse(txt);
//             var _results = res;

//             setPostsList(_results._ret);
//         }
//         catch (e) {
//             console.log(e.toString());
//             storage.storeToken(res.jwtToken);
//         }
//     };

//     var i = 0;

//     for (i = 0; i < postsList.length; i++) {
//         console.log(postsList[i]);
//     }


//     let jsonArray = [];
//     jsonArray = [
//         {
//             image: "https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp",
//             critter_name: "bumblebee"
//         },
//         {
//             image: "https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp",
//             critter_name: "bumblebee"
//         },
//         {
//             image: "https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp",
//             critter_name: "bumblebee"
//         },
//         {
//             image: "https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp",
//             critter_name: "bumblebee"
//         },
//         {
//             image: "https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp",
//             critter_name: "bumblebee"
//         },
//         {
//             image: "https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp",
//             critter_name: "bumblebee"
//         }
//     ];




//     return (

//         <div className='h-screen grid place-items-center bg-gradient-to-r from-emerald-300 to-emerald-500'>

//             <div className='h-30 w-60 bg-black bg-opacity-50 rounded-lg'>
//                 <img src="https://thumbs.dreamstime.com/b/cartoon-hippo-open-mouth-profile-flat-color-vector-ilustration-isolated-white-background-children-kids-238612925.jpg" className='w-25'></img>
//                 <div className='bg-slate-50'>
//                     Critter Hunter Bob
//                     <div className=''>
//                         <div className='bg-red-300 rounded w-1/2'>
//                             Friends: 100
//                             <br></br>
//                             Posts: 20
//                         </div>

//                         <div className='bg-red-300 w-1/2'>
//                             Points: 2050
//                             <br></br>
//                             Current Rank: Beginner
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className='bg-slate-50 bg-opacity-70'>
//                 <MDBCardBody className="text-black p-4">
//                     <div className="d-flex justify-content-between align-items-center mb-4">
//                         <MDBCardText className="lead fw-normal mb-0">Critters</MDBCardText>
//                         <button className='mb-0 text-muted' onClick={searchPosts}>Show all</button> 
//                     </div>
//                         <div className="g-2 grid grid-cols-3">
//                             { jsonArray.map(array => {
//                                 return (
//                                     <div className="mb-2 mr-2 relative">
//                                         <div className='absolute w-full h-full mt-0 ml-0 bg-black bg-opacity-0 text-white rounded-lg flex flex-col items-center justify-center hover:bg-opacity-60'>
//                                             <div className=''>{array.critter_name}</div>
//                                         </div>
//                                         <img src={array.image}
//                                         alt="image 1" className="w-full rounded-lg" />
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                 </MDBCardBody>

//             </div>
//         </div>

        

//     );
// }


// export default ProfileCard;