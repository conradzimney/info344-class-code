-- file path must be a full path to your CSV file
load data infile '~/Downloads/zip_code_database.csv'
into table zips
fields terminated by ','
optionally enclosed by '"'
ignore 1 lines;
