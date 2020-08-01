import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from 'semantic-ui-react';

import AnnouncementContainer from '../AnnouncementContainer/AnnouncementContainer';
import LinkContainer from '../LinkContainer/LinkContainer';
import MemberListModal from '../MemberListModal/MemberListModal';
import MessageContainer from '../MessageContainer/MessageContainer';

import announcementsData from '../../../helpers/announcementsData';
import guildsData from '../../../helpers/guildsData';
import linksData from '../../../helpers/circleLinksData';
import messagesData from '../../../helpers/messagesData';
import userData from '../../../helpers/usersData';

import './SingleGuild.scss';

class SingleGuild extends React.Component {
  state = {
    guild: {},
    guildMember: false,
    guildMessages: [],
    currentUser: {},
    announcements: [],
    leaderView: false,
    childGuildMembers: [],
  }

  static props = {
    authed: PropTypes.Boolean,
    uid: PropTypes.string,
  }

  componentDidMount() {
    this.getGuildData();
  }

  getGuildData = () => {
    const { guildId } = this.props.match.params;
    const { authed, uid } = this.props;
    guildsData.getGuildById(guildId)
      .then((result) => {
        this.setState({ guild: result });
        if (authed) {
          this.getUser(uid, guildId, result.userId);
        }
      })
      .catch((err) => console.error('err from get guild data', err));
  }

  getUser = (uid, guildId, guildUserId) => {
    userData.getSingleUserData(uid)
      .then((user) => {
        this.setState({ currentUser: user });
        this.verifyGuildMembership(user.userId, guildId);
        this.checkLeaderStatus(user.userId, guildUserId);
      })
      .catch((err) => console.error('err from get user in guilds', err));
  }

  getMessageData = (boardId) => {
    messagesData.getAllMessages(boardId)
      .then((messageArr) => this.setState({ guildMessages: messageArr }))
      .catch((err) => console.error('err from get all messages', err));
  }

  verifyGuildMembership = (userId, guildId) => {
    guildsData.verifyMembership(userId, guildId)
      .then((isMemberResult) => this.setState({ guildMember: isMemberResult }))
      .catch((err) => console.error('error from verify guild membership', err));
  }

  checkLeaderStatus = (userId, guildUserId) => {
    if (userId === guildUserId) this.setState({ leaderView: true });
  }

  joinThisGuild = (e) => {
    e.preventDefault();
    const { currentUser, guild } = this.state;
    const memberInfo = {
      userId: currentUser.userId,
      guildId: guild.guildId,
    };
    guildsData.joinGuild(memberInfo)
      .then(() => {
        this.setState({ guildMember: true });
        this.getGuildData();
      })
      .catch((err) => console.error('err from join guild', err));
  }

  postMessageToBoard = (messageObject) => {
    messagesData.postNewMessage(messageObject)
      .then(() => {
        this.getMessageData(messageObject.boardId);
      })
      .catch((err) => console.error('err from post message To Board', err));
  }

  deleteMessageFromBoard = (messageId) => {
    const { guild } = this.state;
    messagesData.deleteMessage(messageId)
      .then(() => {
        this.getMessageData(guild.boardId);
      })
      .catch((err) => console.error('err from delete message', err));
  }

  updateUserMessage = (updatedMessage) => {
    const { guild } = this.state;
    messagesData.updateMessage(updatedMessage)
      .then(() => {
        this.getMessageData(guild.boardId);
      })
      .catch((err) => console.error('err from update message', err));
  }

  renderBoard = () => {
    const { authed } = this.props;
    const {
      announcements,
      guild,
      guildMember,
      guildMessages,
      currentUser,
      links,
      leaderView,
    } = this.state;
    if (authed) {
      if (guildMember && guild.boardId !== 0) {
        return (
          <Grid>
            <Grid.Column width={10}>
            <MessageContainer
                  currentUser={currentUser}
                  currentUserId={currentUser.userId}
                  postMessage={this.postMessageToBoard}
                  messages={guildMessages}
                  currentBoardId={guild.boardId}
                  deleteMessageFromBoard={this.deleteMessageFromBoard}
                  updateUserMessage={this.updateUserMessage} />
            </Grid.Column>
            <Grid.Column width={6}>
              {/* <AnnouncementContainer getAnnouncementData={this.getAnnouncementData} guildId={guild.guildId} announcements={announcements} leaderView={leaderView} />
              <LinkContainer getLinkData={this.getLinkData} saveNewLink={this.saveNewLink} guildId={guild.guildId} links={links} leaderView={leaderView} /> */}
            </Grid.Column>
          </Grid>
        );
      } return (
        <Button color='brown' onClick={this.joinThisGuild}>Click to Join Guild</Button>
      );
    } return (<p>You should login if you want to join this board</p>);
  }

  render() {
    const { guild } = this.state;
    return (
      <div className="SingleGuild">
        <div className="GuildInfoDiv">
          <h2>Guild: {guild.guildName}</h2>
          <h3>Leader: {guild.guildLeader} </h3>
          <p className="GuildDescription">{guild.guildDescription}</p>
        </div>
        { this.renderBoard() }
      </div>
    );
  }
}

export default SingleGuild;
