create table Guild (
	GuildId int IDENTITY (1, 1) not null,
	UserId int not null,
	GuildName varchar(50) not null,
	GuildDescription varchar(255) not null,
	boardId int null,
);

INSERT Guild 
(UserId, GuildName, GuildDescription, boardId)
values 
(2, 'Crochet - Amigurumi', 'This guild is dedicated to the art of crocheting cute little amigurumi.', null)
INSERT Guild 
(UserId, GuildName, GuildDescription, boardId)
values 
(2, 'Woodworking', 'In this guild we are going to go over the basic elements for beginners.', null)