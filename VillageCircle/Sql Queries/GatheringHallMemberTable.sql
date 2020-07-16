create table [GatheringHallMember] (
	gatheringHallMemberId int identity(1,1) not null,
	userId int not null,
	gatheringHallId int not null,
);