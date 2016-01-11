-- download zip CSV file from http://www.unitedstateszipcodes.org/zip-code-database/

drop table if exists zips;

create table zips (
    zip varchar(10) not null primary key,
    type varchar(64),    
    primary_city varchar(128),
    acceptable_cities text,
    unacceptable_cities text,
    state varchar(2),
    county varchar(64),
    timezone varchar(64),
    area_codes varchar(64),
    latitude float,
    longitude float,
    world_region varchar(2),
    country varchar(2),
    decommissioned bool,
    estimated_population int,
    notes text,

    index (primary_city)
);
