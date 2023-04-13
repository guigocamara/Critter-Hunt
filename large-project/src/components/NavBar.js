import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar(){
    return (
      <div class="flex flex-row bg-green-500 w-100% h-16 items-center">
        <li class="text-lg list-none text-white ml-5">
            <Link to='/map'>Home</Link>
        </li>
        <li class="text-lg list-none text-white ml-5">
            <Link class="h-100%" to='/profile'>Profile</Link>
        </li>

      </div>
    )
}