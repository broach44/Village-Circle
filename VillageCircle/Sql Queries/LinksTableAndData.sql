drop table [Links]


create table [CircleLinks]
(
	linkId int identity(1,1) not null,
	linkTitle varchar(255) not null,
	linkDescription varchar(255) not null,
	linkUrl varchar(255) not null,
	IsAvailable bit not null,
	circleId int not null
);

insert into [CircleLinks]
(linkTitle, linkDescription, linkUrl, IsAvailable, circleId)
values
('Math Blaster Game', 'Fun game to play while you learn math concepts', 'http://www.mathblaster.com/', 1, 1)

insert into [CircleLinks]
(linkTitle, linkDescription, linkUrl, IsAvailable, circleId)
values
('National Geographic Kids', 'Fun and focused in science this link will have various different videos and games to check out', 'https://kids.nationalgeographic.com/', 1, 2)
