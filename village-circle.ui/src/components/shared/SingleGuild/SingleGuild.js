import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from 'semantic-ui-react';

import GuildAnnouncementContainer from '../GuildAnnouncementContainer/GuildAnnouncementContainer';
import GuildLinkContainer from '../GuildLinkContainer/GuildLinkContainer';
import MemberListModal from '../MemberListModal/MemberListModal';
import MessageContainer from '../MessageContainer/MessageContainer';

import announcementsData from '../../../helpers/guildAnnouncementsData';
import guildsData from '../../../helpers/guildsData';
import linksData from '../../../helpers/guildLinksData';
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
    links: [],
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
          this.getMessageData(result.boardId);
          this.getAnnouncementData(result.guildId);
          this.getLinkData(result.guildId);
          this.getMembers(result.guildId);
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

  getAnnouncementData = (guildId) => {
    announcementsData.getAllAnnouncements(guildId)
      .then((result) => this.setState({ announcements: result }))
      .catch((err) => console.error('err from get announcements', err));
  }

  getLinkData = (guildId) => {
    linksData.getAllLinks(guildId)
      .then((result) => this.setState({ links: result }))
      .catch((err) => console.error('err from get links', err));
  }

  getMembers = (guildId) => {
    guildsData.getMemberListOfGuild(guildId)
      .then((memberData) => {
        const childUsers = memberData.filter((member) => member.isChild === true);
        this.setState({ childGuildMembers: childUsers });
      })
      .catch((err) => console.error('err from get guild members', err));
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
      guild,
      guildMember,
      guildMessages,
      currentUser,
    } = this.state;
    if (authed) {
      if (guildMember && guild.boardId !== 0) {
        return (
            <MessageContainer
                  currentUser={currentUser}
                  currentUserId={currentUser.userId}
                  postMessage={this.postMessageToBoard}
                  messages={guildMessages}
                  currentBoardId={guild.boardId}
                  deleteMessageFromBoard={this.deleteMessageFromBoard}
                  updateUserMessage={this.updateUserMessage} />
        );
      } return (
        <Button color='brown' onClick={this.joinThisGuild}>Click to Join Guild</Button>
      );
    } return (<p>You should login if you want to join this board</p>);
  }

  renderLeaderView = () => {
    if (this.state.leaderView) return <MemberListModal members={this.state.childGuildMembers} />;
    return <></>;
  }

  render() {
    const {
      guild,
      leaderView,
      links,
      announcements,
    } = this.state;
    return (
      <div className="SingleGuild">
        <Grid className="GuildInfoDiv">
          <Grid.Column width={9}>
            <h2>Guild: {guild.guildName}</h2>
            <h3>Leader: {guild.guildLeader}</h3>
            <p className="GuildDescription">{guild.guildDescription}</p>
            { this.renderLeaderView() }
            { this.renderBoard() }
          </Grid.Column>
          <Grid.Column width={7}>
            <GuildAnnouncementContainer getAnnouncementData={this.getAnnouncementData} guildId={guild.guildId} announcements={announcements} leaderView={leaderView} />
            <GuildLinkContainer getLinkData={this.getLinkData} saveNewLink={this.saveNewLink} guildId={guild.guildId} links={links} leaderView={leaderView} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default SingleGuild;
