import React from 'react'
import { Link } from 'react-router-dom'


export default function NavBar(){
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    //var favorite = ud.favorite;
    var username = ud.username;
    //var password = ud.password;
    const doLogout = event => {
        event.preventDefault();
        localStorage.removeItem("user_data")
        window.location.href = '/';
    };
    return (
        
      <div class="flex flex-row bg-[#57B846] w-100% h-16 items-center justify-between">
        <div class="flex flex-row">
            <li class="text-lg list-none ml-5">
                <Link class="text-white hover:text-sky-700" to='/map'>Home</Link>
            </li>
            <li class="text-lg list-none ml-5">
                <Link class="text-white h-100% hover:text-sky-700" to='/profile'>Profile</Link>
            </li>
        </div>

        {/* <div>
            <li id="userName text-lg" class="text-white list-none">
                Logged In As {username}
            </li><br />
        </div> */}

        <div id="loggedInDiv" class = "flex flex-row">
            <li type="button" id="logoutButton" class="buttons text-white list-none mr-5" onClick={doLogout}> 
                <Link class="text-white hover:text-sky-700">Log out</Link>
            </li>
        </div>

      </div>
    )
}