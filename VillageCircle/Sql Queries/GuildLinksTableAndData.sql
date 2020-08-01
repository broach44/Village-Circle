create table [GuildLinks]
(
	linkId int identity(1,1) not null,
	linkTitle varchar(255) not null,
	linkDescription varchar(255) not null,
	linkUrl varchar(255) not null,
	IsAvailable bit not null,
	guildId int not null
);

insert into [GuildLinks]
(linkTitle, linkDescription, linkUrl, IsAvailable, guildId)
values
('Crochet Link', 'Link to crochet Link from the famouse Legends of Zelda', 'https://www.allaboutami.com/link/', 1, 1)

insert into [GuildLinks]
(linkTitle, linkDescription, linkUrl, IsAvailable, guildId)
values
('Woodworking Projects for Kids', '12 Awesome Woodworking Projects for Kids to Build.', 'https://healthyhandyman.com/woodworking-projects-for-kids-to-build/', 1, 2)

