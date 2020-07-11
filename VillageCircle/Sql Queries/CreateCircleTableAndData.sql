create table Circle (
	CircleId int IDENTITY (1, 1) not null,
	UserId int not null,
	CircleName varchar(50) not null,
	CircleDescription varchar(255) not null,
	boardId int null,
);

INSERT CIRCLE 
(UserId, CircleName, CircleDescription, boardId)
values 
(2, 'Math', 'This is a simple circle dedicated to simple math.  Beginners or refresher of basic math skills', null)
INSERT CIRCLE 
(UserId, CircleName, CircleDescription, boardId)
values 
(2, 'Science', 'This circle will cover a broad spectrum of science topics.  From rocks and minerals to animals and plants, we can learn together about the world around us.', null)
INSERT CIRCLE 
(UserId, CircleName, CircleDescription, boardId)
values 
(2, 'American History', 'In order to not make the same mistakes we must study history.  This course is dedicated to strictly American History', null)
INSERT CIRCLE 
(UserId, CircleName, CircleDescription, boardId)
values 
(2, 'US Geography', 'Need a better sense of direction?  This circle may be for you.  Brush up on your United States Geography right here from the comfort of your own home', null)
INSERT CIRCLE 
(UserId, CircleName, CircleDescription, boardId)
values 
(2, 'Literature', 'This circle will be reviewing several literary works of art throughout the ages.', null)
