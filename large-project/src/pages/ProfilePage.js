import React from 'react';
import NavBar from '../components/NavBar';
import ProfileCard from '../components/ProfileCard';



const ProfilePage = () => {

    return (
        <div>
            <NavBar></NavBar>
            <div className='w-50 h-50'>
                <ProfileCard></ProfileCard>
            </div>
        </div>
        
    )
}

export default ProfilePage;