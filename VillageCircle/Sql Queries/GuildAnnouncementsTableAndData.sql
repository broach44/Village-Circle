
create table [GuildAnnouncements]
(
	announcementId int identity(1,1) not null,
	guildId int not null,
	announcementDateTime datetime not null,
	announcementText varchar(max) not null
);

insert into [GuildAnnouncements]
(guildId, announcementDateTime, announcementText)
values
(1, '2020-07-29', 'This is my first announcement and I am super excited to welcome you all to this Guild!')

insert into [GuildAnnouncements]
(guildId, announcementDateTime, announcementText)
values
(2, '2020-07-28', 'This is another test exmple of the best announcement that you have ever read.')

