create table PointLog (
		PointLogId int IDENTITY (1, 1) not null,
		UserId int not null,
		EarnedDate datetime not null,
		ActivityPointId int not null
);

INSERT PointLog
(UserId, EarnedDate, ActivityPointId)
VALUES
(1, '2020-07-21', 1);

INSERT PointLog
(UserId, EarnedDate, ActivityPointId)
VALUES
(1, '2020-07-21', 1);

INSERT PointLog
(UserId, EarnedDate, ActivityPointId)
VALUES
(1, '2020-07-21', 1);

INSERT PointLog
(UserId, EarnedDate, ActivityPointId)
VALUES
(1, '2020-07-21', 1);

INSERT PointLog
(UserId, EarnedDate, ActivityPointId)
VALUES
(2, '2020-07-21', 1);

create table ActivityPoints (
	ActivityPointId int IDENTITY (1,1) not null,
	NumberOfPoints int not null,
	ActivityName varchar(100) not null
);

Insert ActivityPoints
(NumberOfPoints, ActivityName)
values
(15, 'Message Post');

select * from ActivityPoints

select * from [PointLog]

select PointLog.PointLogId, PointLog.UserId, PointLog.EarnedDate, PointLog.ActivityPointId, ActivityPoints.NumberOfPoints, ActivityPoints.ActivityName
from PointLog
join ActivityPoints on PointLog.ActivityPointId = ActivityPoints.ActivityPointId
where PointLog.UserId = 1;


select sum(numberOfPoints) as totalPoints
from PointLog
join ActivityPoints on PointLog.ActivityPointId = ActivityPoints.ActivityPointId
where pointlog.UserId = 1;