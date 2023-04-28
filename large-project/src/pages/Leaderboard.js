import React from 'react';
import Lboard from '../components/Lboard'; // update import statement to use Lboard
import NavBar from '../components/NavBar';
import './style.css';

const Leaderboard = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Lboard />
    </div>
  );
};

export default Leaderboard;
