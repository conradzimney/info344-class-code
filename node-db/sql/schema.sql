-- create database
create database if not exists news character set = "UTF8";

-- use it
use news;

-- create the stories table
create or replace table stories (
    id int not null primary key auto_increment,
    url varchar(2048) not null,        
    votes int not null default 0,
    createdOn datetime not null default now()
);
