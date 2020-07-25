drop table [user]

create table [User] (
	userId int identity(1,1) not null,
	firstName varchar(25) not null,
	lastName varchar(25) not null,
	age int not null,
	email varchar(50) not null,
	[uid] varchar(100) not null,
	userLevelId int not null,
	isParent bit not null,
	isChild bit not null,
);

insert [User]
(firstname, lastname, age, email, [uid], userLevelId, isParent, isChild)
values
('Crystal', 'Broach', 34, 'crysland@gmail.com', '1KkyM8q4CgSQQjp0yExVQtA6DXa2', 2, 1, 0)

insert [User]
(firstname, lastname, age, email, [uid], userLevelId, isParent, isChild)
values
('Avalyn', 'Broach', 11, 'avalynbroach@gmail.com', 'Z2KzLVC9LGesjS1NlMVA4SKx6X93', 1, 0, 1)

insert [User]
(firstname, lastname, age, email, [uid], userLevelId, isParent, isChild)
values
('Chris', 'Broach', 38, 'chrisbroach@gmail.com', 'awyRnkdvzfcbWY9bOASxdzvc4KF3', 2, 1, 0)

insert [User]
(firstname, lastname, age, email, [uid], userLevelId, isParent, isChild)
values
('Olivia', 'AvasFriend', 11, 'oliveoil@gmail.com', 'sGDXyuHgFnPUC8972MiFT0JpJv72', 1, 0, 1)

select * from [user]