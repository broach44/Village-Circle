create table GatheringHall (
	GatheringHallId int IDENTITY (1, 1) not null,
	UserId int not null,
	GatheringHallName varchar(50) not null,
	GatheringHallDescription varchar(255) not null,
	boardId int null,
);

INSERT GatheringHall 
(UserId, GatheringHallName, GatheringHallDescription, boardId)
values 
(2, 'Roblox', 'Group where we can all chat about Roblox and find new friends to play with.', null)
INSERT GatheringHall 
(UserId, GatheringHallName, GatheringHallDescription, boardId)
values 
(2, 'Disney Movie Fans', 'A group for all those disney nuts out there to hang.', null)