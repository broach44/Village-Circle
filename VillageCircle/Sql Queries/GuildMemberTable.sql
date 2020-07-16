create table [GuildMember] (
	guildMemberId int identity(1,1) not null,
	userId int not null,
	guildId int not null,
);