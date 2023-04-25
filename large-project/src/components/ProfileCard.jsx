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
import './profilecard.css';


function ProfileCard() {

    const [postsList, setPostsList] = useState([]);
    var bp = require('../components/Path.js');
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userID = ud.userID;

    useEffect(() => {
        // Update the document title using the browser API
        searchPosts();
        console.log(userID);
      },[]);
  
      const searchPosts = async event => {
          var storage = require('../tokenStorage.js');
          var obj = { search: "", jwtToken: storage.retrieveToken() };
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

    return (
        <div className='h-screen grid place-items-center bg-gradient-to-r from-emerald-300 to-emerald-500'>
            <MDBContainer className='py-5 h-screen w-1/2 align-self-center bg-gray-400'>
                <MDBRow className='justify-content-center align-items-center h-100'>
                    <MDBCol>
                        <MDBCard>
                            <div className='rounded-top text-white d-flex flex-row bg-slate-50 h-14'>
                                <div className='ms-4 mt-5 d-flex flex-column w-150px'>
                                {/* <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                                    Edit profile
                                </MDBBtn> */}
                                </div>
                                <div className="ms-3" style={{ marginTop: '130px' }}>
                                    <MDBTypography tag="h5" className='text-black'>Andy Horwitz</MDBTypography>
                                    <MDBCardText className='text-black'>New York</MDBCardText>
                                </div>
                            </div>
                            <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                <div className="d-flex text-center py-1 w-1/2">
                                    <div>
                                        <MDBCardText className="mb-1 h5">253</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                                    </div>
                                    <div className="px-3">
                                        <MDBCardText className="mb-1 h5">1026</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                                    </div>
                                    <div>
                                        <MDBCardText className="mb-1 h5">478</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                                    </div>
                                </div>
                            </div>
                            <MDBCardBody className="text-black p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                                <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                                </div>
                                <MDBRow className="g-2 grid grid-cols-3">
                                {postsList.map(post => {
                                    return (
                                        <div>
                                        {post.author == userID && 
                                        <MDBCol className="mb-2">
                                            <MDBCardImage src={`http://critterhunt.herokuapp.com/image/${post.picture}`}
                                        alt="image 1" className="w-full rounded-lg" />
                                        </MDBCol>
                                        }
                                        </div>
                                
                                    )
                                })};
                                {/* <MDBCol className="mb-2">
                                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                    alt="ima)ge 1" className="w-full rounded-lg" />
                                </MDBCol>
                                <MDBCol className="mb-2">
                                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                    alt="image 1" className="w-full rounded-lg" />
                                </MDBCol>
                                <MDBCol className="mb-2">
                                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                    alt="image 1" className="w-full rounded-lg" />
                                </MDBCol>
                                <MDBCol className="mb-2">
                                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                    alt="image 1" className="w-full rounded-lg" />
                                </MDBCol> */}
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>

    //     <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
    //   <MDBContainer className="py-5 h-100">
    //     <MDBRow className="justify-content-center align-items-center h-100">
    //       <MDBCol lg="9" xl="7">
    //         <MDBCard>
    //           <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
    //             <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
    //               <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
    //                 alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
    //               {/* <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
    //                 Edit profile
    //               </MDBBtn> */}
    //             </div>
    //             <div className="ms-3" style={{ marginTop: '130px' }}>
    //               <MDBTypography tag="h5">Andy Horwitz</MDBTypography>
    //               <MDBCardText>New York</MDBCardText>
    //             </div>
    //           </div>
    //           <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
    //             <div className="d-flex justify-content-end text-center py-1">
    //               <div>
    //                 <MDBCardText className="mb-1 h5">253</MDBCardText>
    //                 <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
    //               </div>
    //               <div className="px-3">
    //                 <MDBCardText className="mb-1 h5">1026</MDBCardText>
    //                 <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
    //               </div>
    //               <div>
    //                 <MDBCardText className="mb-1 h5">478</MDBCardText>
    //                 <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
    //               </div>
    //             </div>
    //           </div>
    //           <MDBCardBody className="text-black p-4">
    //             <div className="mb-5">
    //               <p className="lead fw-normal mb-1">About</p>
    //               <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
    //                 <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
    //                 <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
    //                 <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
    //               </div>
    //             </div>
    //             <div className="d-flex justify-content-between align-items-center mb-4">
    //               <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
    //               <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
    //             </div>
    //             <MDBRow>
    //               <MDBCol className="mb-2">
    //                 <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
    //                   alt="image 1" className="w-100 rounded-3" />
    //               </MDBCol>
    //               <MDBCol className="mb-2">
    //                 <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
    //                   alt="image 1" className="w-100 rounded-3" />
    //               </MDBCol>
    //             </MDBRow>
    //             <MDBRow className="g-2">
    //               <MDBCol className="mb-2">
    //                 <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
    //                   alt="image 1" className="w-100 rounded-3" />
    //               </MDBCol>
    //               <MDBCol className="mb-2">
    //                 <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
    //                   alt="image 1" className="w-100 rounded-3" />
    //               </MDBCol>
    //             </MDBRow>
    //           </MDBCardBody>
    //         </MDBCard>
    //       </MDBCol>
    //     </MDBRow>
    //   </MDBContainer>
    // </div>
    );
}


export default ProfileCard;