drop table [user]

create table [User] (
	userId int identity(1,1) not null,
	firstName varchar(25) not null,
	lastName varchar(25) not null,
	age int not null,
	email varchar(50) not null,
	[uid] varchar(100) not null
);

insert [User]
(firstname, lastname, age, email, [uid])
values
('Crystal', 'Broach', 34, 'crysland@gmail.com', '1KkyM8q4CgSQQjp0yExVQtA6DXa2')

insert [User]
(firstname, lastname, age, email, [uid])
values
('Avalyn', 'Broach', 11, 'avalynbroach@gmail.com', 'Z2KzLVC9LGesjS1NlMVA4SKx6X93')

insert [User]
(firstname, lastname, age, email, [uid])
values
('Chris', 'Broach', 38, 'chrisbroach@gmail.com', 'awyRnkdvzfcbWY9bOASxdzvc4KF3')

insert [User]
(firstname, lastname, age, email, [uid])
values
('Olivia', 'AvasFriend', 11, 'oliveoil@gmail.com', 'sGDXyuHgFnPUC8972MiFT0JpJv72')

select * from [user]