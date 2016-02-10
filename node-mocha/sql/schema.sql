-- drop any existing database
drop database if exists shorty;

create database shorty character set="UTF8";
use shorty;
create table urls (
    id int auto_increment primary key not null,
    url varchar(2048) not null
)
