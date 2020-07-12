create table [Message] (
	messageId int identity(1,1) not null,
	boardId int not null,
	userId int not null,
	messageText varchar(255) not null
);

insert [Message]
(boardId, userId, messageText)
values
(5,
 1,
'So super excited to start learning some more about Math on this platform')

insert [Message]
(boardId, userId, messageText)
values
(4,
 1,
'Anyone want to play Roblox with me?')

insert [Message]
(boardId, userId, messageText)
values
(5,
 2,
'So super excited to start learning some more about Math on this platform')