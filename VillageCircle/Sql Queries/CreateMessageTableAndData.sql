drop table [message]

create table [Message] (
	messageId int identity(1,1) not null,
	boardId int not null,
	userId int not null,
	messageText varchar(255) not null,
	postDateTime datetime not null
);

insert [Message]
(boardId, userId, messageText, postDateTime)
values
(5,
 1,
'So super excited to start learning some more about Math on this platform',
'2020-07-15')

insert [Message]
(boardId, userId, messageText, postDateTime)
values
(4,
 1,
'Anyone want to play Roblox with me?',
'2020-07-11')

insert [Message]
(boardId, userId, messageText, postDateTime)
values
(5,
 2,
'So super excited to start learning some more about Math on this platform',
'2020-07-14')

select * from [message]
