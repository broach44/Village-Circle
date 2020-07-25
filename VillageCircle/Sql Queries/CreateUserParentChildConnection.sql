create table [UserParentConnection] (
	userParentConnectionId int identity(1,1) not null,
	childUserId int not null,
	parentUserId int not null,
);

insert [UserParentConnection]
(childUserId, parentUserId)
values
(2, 1)

insert [UserParentConnection]
(childUserId, parentUserId)
values
(2, 3)