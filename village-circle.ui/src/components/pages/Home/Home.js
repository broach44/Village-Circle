import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className='homeComponent'>
        <Link to="/circles" className='circleDiv'>Circles</Link>
        <Link to="/guilds" className='guildDiv'>Guilds</Link>
        <Link to="/gatheringHalls" className='hallDiv'>Gathering Halls</Link>
        <div className='welcomeDiv'>Welcome to the Village, your gateway to learning something new today.  The goal here is to foster a welcoming social learning environment to learn anything from Science and Math to woodworking and crochet.
        <div className='innerwelcome'>&lt;-- Click an option to the left to get started!</div>
        </div>
      </div>
    )
  }
}

export default Home;
