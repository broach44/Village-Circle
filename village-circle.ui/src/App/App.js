import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase, { auth } from 'firebase';
import 'firebase/auth';

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
import authData from '../helpers/authData';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

connection();

class App extends React.Component {
  state = {
    authed: false,
    uid: '',
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
        this.setState({ uid: authData.getUid() });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  logoutUser = () => {
    authData.logoutUser()
      .then(() => this.setState({ authed: false, uid: '' }))
      .catch((err) => console.error('err from logout', err));
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, uid } = this.state;
    return (
      <div className="App">
       <Router>
          <MainNavbar authed={authed} logoutUser={this.logoutUser} />
          <Switch>
            <PrivateRoute path="/profile" exact component={Profile} authed={authed} />
            <Route path="/circle/:circleId" render={(props) => <Circle {...props} authed={authed} uid={uid} />}/>
            <Route path="/guild/:guildId" render={(props) => <Guild {...props} authed={authed} />}/>
            <Route path="/gatheringHall/:gatheringHallId" render={(props) => <GatheringHall {...props} authed={authed} />}/>
            <Route path="/circles" render={(props) => <Circles {...props} authed={authed} />}/>
            <Route path="/guilds" render={(props) => <Guilds {...props} authed={authed} />}/>
            <Route path="/gatheringHalls" render={(props) => <GatheringHalls {...props} authed={authed} />}/>
            <Route path="/" render={(props) => <Home {...props} authed={authed} />}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
