create table [User] (
	userId int identity(1,1) not null,
	firstName varchar(25) not null,
	lastName varchar(25) not null,
	age int not null,
);

insert [User]
(firstname, lastname, age)
values
('Crystal', 'Broach', 34)

insert [User]
(firstname, lastname, age)
values
('Avalyn', 'Broach', 11)

insert [User]
(firstname, lastname, age)
values
('Chris', 'Broach', 38)

insert [User]
(firstname, lastname, age)
values
('Olivia', 'AvasFriend', 11)