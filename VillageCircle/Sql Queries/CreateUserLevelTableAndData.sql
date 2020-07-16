
drop table [UserLevel]

Create table [UserLevel] (
	userLevelId int identity not null,
	levelName varchar(25) not null,
	roleDescription varchar(255) not null
);

insert into [UserLevel]
(levelName, roleDescription)
values
('Apprentice', 'Eager to learn something new or expand knowledge.')

insert into [UserLevel]
(levelName, roleDescription)
values
('Journeyman', 'Someone who has some moderate skill level and is willing to share what they know with others.')

insert into [UserLevel]
(levelName, roleDescription)
values
('Master', 'A person who has extensive knowledge through training, education or experience and has mastered a topic.')