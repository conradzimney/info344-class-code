-- create database
create database if not exists news character set = "UTF8";

-- use it
use news;

-- create the stories table
create or replace table stories (
    id int not null primary key auto_increment,
<<<<<<< HEAD
    url varchar(2048) not null,     
    title varchar(1024) null,   
=======
    url varchar(2048) not null,
    title varchar(1024) null,       
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a
    votes int not null default 0,
    createdOn datetime not null default now()
);
