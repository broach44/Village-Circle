import React from 'react';
import {
  Image,
  Button,
  Header,
  Container,
  Divider,
  Grid,
} from 'semantic-ui-react';
import './Profile.scss';
import usersData from '../../../helpers/usersData';

class Profile extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    usersData.getSingleUserData(this.props.uid)
      .then((userData) => this.setState({ user: userData }))
      .catch((err) => console.error('err from getuser', err));
  }

  render() {
    const { user } = this.state;
    return (
      <Container fluid textAlign='left' className="Profile">
        <Header>My Profile</Header>
        <Grid columns='equal'>
          <Grid.Column width={2}>
            <Image src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-20kR46wUnTXeI8wTX1CUN5PpX81PJDpiSg&usqp=CAU'} size='small' />
          </Grid.Column>
          <Grid.Column>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Age: {user.age}</p>
            {/* <p>Total Points Earned: 200</p> */}
            <p>Email: {user.email}</p>
            <Button disabled>Edit Profile</Button>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Grid columns={2}>
          <Grid.Column>
            <Header>Goals</Header>
            <p>*** COMING SOON ***</p>
          </Grid.Column>
          <Grid.Column>
            <Header>Activity</Header>
            <p>Posted to Some Location Message Board on 1/1/1111 : Earned 99 points!</p>
            <p>Posted to Some Location Message Board on 1/1/1111 : Earned 99 points!</p>
            <p>Posted to Some Location Message Board on 1/1/1111 : Earned 99 points!</p>
            <p>Posted to Some Location Message Board on 1/1/1111 : Earned 99 points!</p>
            <p>Posted to Some Location Message Board on 1/1/1111 : Earned 99 points!</p>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Profile;
