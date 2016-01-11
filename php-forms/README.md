# PHP Forms and Databases Day

This folder contains file stubs for our day on writing PHP applications that gather input from users via forms, and communicate with Relational Database Management Systems (RDBMSs). We will use the [MySQL database engine](https://www.mysql.com/), which is the most popular open-source RDBMS. 

Although the [MySQL Community Edition](http://dev.mysql.com/downloads/mysql/) is free, the code is now owned by Oracle, so some in the open-source world are concerned that it might not remain that way. To ensure that it remains open-source, the project was forked into [MariaDB](https://mariadb.org/), which is owned by the MariaDB Foundation. MariaDB is fully-compatible with MySQL, so you can use the same client tools with either. 

## Database Setup

Both MySQL and the MySQL Workbench are already installed on our lab machines. If you're using your own personal laptop, you need to install them. I sent email last week with the details.

### Start the Server

Ensure that MySQL is running. If you are on a lab machine, or if you installed MySQL via XAMPP, open the XAMPP control panel and start the MySQL Server. On OS X,  XAMPP is in the Applications folder. On Windows, XAMPP is under the Start Menu's Program folder.

If you installed MySQL via Homebrew on OS X, it should already be running. If not, execute this in the terminal:

```bash
mysql.server start
```

### Connect Using MySQL Workbench

Open the MySQL Workbench application, and connect to your local instance. If you setup a password for the `root` account (which you should), you will be prompted for that password.

### Create a Database

Create a database in which we will create our tables. You can create a database using this syntax:

```sql
create database zips character set='UTF8';
```

### Create a User Account

Your PHP application should connect to your database using a specific user account with limited permissions. In our case, the account only needs to select from tables in this new `zips` database. To create the user and grant select permissions, execute these statements:

```sql
create user zipsuser@localhost identified by 'some strong password';
grant select on zips.* to zipsuser@localhost;
```

This creates a new user with the name `zipsuser` who can only connect from the local machine, and grants that user select permissions on all tables in the `zips` database.

### Create the Table

Switch into your new database by executing this command:

```sql
use zips;
```

Then open the `sql/schema.sql` file and execute it to create the `zips` table.

### Download and Import the CSV File

Download the [zips CSV file](http://www.unitedstateszipcodes.org/zip_code_database.csv). This file contains information about every zip code in the United States.

Import the data into your new table using the script in `sql/load-data.sql`. The path to the CSV file may need to be adjusted, especially if you're on Windows.

## DB Credentials

Copy the `secret/db-credentials.php.template` file to `secret/db-credentials.php` and then fill out the user and password values. If you followed the instructions above, the user should be set to `zipsuser` and the password set to whatever you chose as the password. 
