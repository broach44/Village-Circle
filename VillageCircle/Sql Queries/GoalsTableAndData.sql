create table [Goals]
(
	goalId int identity(1,1) not null,
	userId int not null,
	pointTarget int not null,
	isComplete bit not null,
);

insert into [goals]
(userId, pointTarget, isComplete)
values (2, 50, 0)

insert into [goals]
(userId, pointTarget, isComplete)
values (4, 50, 0)

insert into [goals]
(userId, pointTarget, isComplete)
values (5, 150, 0)

insert into [goals]
(userId, pointTarget, isComplete)
values (2, 10, 1)

select *
from [Goals]
where userId = 2 and ;