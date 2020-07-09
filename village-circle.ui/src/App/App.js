import React from 'react';
import { Button } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Auth from '../components/pages/Auth/Auth';
import MainNavbar from '../components/shared/MainNavbar/MainNavbar';
import Circle from '../components/shared/SingleCircle/SingleCircle';
import Circles from '../components/pages/Circles/Circles';
import Home from '../components/pages/Home/Home';
import Guild from '../components/shared/SingleGuild/SingleGuild';
import Guilds from '../components/pages/Guilds/Guilds';
import GatheringHall from '../components/shared/SingleGatheringHall/SingleGatheringHall';
import GatheringHalls from '../components/pages/GatheringHalls/GatheringHalls';
import Profile from '../components/pages/Profile/Profile';

import connection from '../helpers/connection';

import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

// const PrivateRoute = ({ component: Component, authed, ...rest }) => {
//   const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
//   return <Route {...rest} render={(props) => routeChecker(props)} />;
// };

connection.setupFunc();

class App extends React.Component {
  state = {
    authed: false,
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <h1>The Village Circle</h1>
        <Router>
          <MainNavbar authed={authed} />
          <Switch>
            {/* <PublicRoute path="/circle/:circleId" exact component={Circle} authed={authed} />
            <PublicRoute path="/guild/:guildId" exact component={Guild} authed={authed} /> */}
            {/* <PublicRoute path="/gatheringHall/:gatheringHallId" exact component={GatheringHall} authed={authed} /> */}
            <PublicRoute path="/profile" exact component={Profile} authed={authed} />
            <PublicRoute path="/circles" exact component={Circles} authed={this.state.authed} />
            <PublicRoute path="/guilds" exact component={Guilds} authed={authed} />
            <PublicRoute path="/gatheringHalls" exact component={GatheringHalls} authed={authed} />
            <PublicRoute path="/" exact component={Home} authed={authed} />
            <PublicRoute path="/auth" exact component={Auth} authed={authed} />
          </Switch>
        </Router>
        <Button color='teal' className='coolButton'>Coolest Button Ever!</Button>
      </div>
    );
  }
}

export default App;
