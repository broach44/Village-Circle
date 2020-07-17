import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/auth';

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

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

connection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
       <Router>
          <MainNavbar authed={authed} />
          <Switch>
            <PrivateRoute path="/profile" exact component={Profile} authed={authed} />
            <Route path="/circle/:circleId" exact component={Circle} authed={authed} />
            <Route path="/guild/:guildId" exact component={Guild} authed={authed} />
            <Route path="/gatheringHall/:gatheringHallId" exact component={GatheringHall} authed={authed} />
            <Route path="/circles" exact component={Circles} authed={authed} />
            <Route path="/guilds" exact component={Guilds} authed={authed} />
            <Route path="/gatheringHalls" exact component={GatheringHalls} authed={authed} />
            <Route path="/" exact component={Home} authed={authed} />
            <Route path="/auth" exact component={Auth} authed={authed} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
