import React from 'react';

import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className='homeComponent'>
        <h2>Home</h2>
        <div className='circleDiv'>Circles</div>
        <div className='guildDiv'>Guilds</div>
        <div className='hallDiv'>Gathering Halls</div>
      </div>
    )
  }
}

export default Home;
