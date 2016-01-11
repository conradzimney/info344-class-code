# Lab 2: Simple Chat Client Using PHP & MySQL

Let's get some practice using PHP's PDO to query and insert items into a
database. We will build a simple chat client for this lab that will allow you
to send and receive messages with your classmates!

## User Interface & Interactions

For the first part of this assignment, we will begin with a simple UI. When
users enter the chat, they should be able to see the last 10 messages sent.
Each message entry should display the nickname of the sender, the content of
the message, and the date/time in which it was sent.

Below the message list, provide the users with a textbox to specify their
nickname to send the messages with, and a textarea for the contents of the
message. They user should be able to send the message by pressing the enter key
or by clicking a "send" button next to the textarea. If the user does not
specify a nickname while sending a message, it should appear as 'anonymous'.

After sending a message, the page should refresh and show the newly sent
message in the page. If the user specified a nickname, ensure that it appears
in the newly loaded page to avoid re-entering.

## Our Database

Before we discuss how to connect to interact with our database, let's get a
better feel for MySQL directly from the command line!

TODO(nadavash): Finish this section.

## Connecting to MySQL from PHP

We've already created a MySQL database with the necessary schema for you, so
all you need to do is connect and query it! You will need to make use of PHP's
PDO to interact with our database. Setting up the PDO looks something like this:

```php
$dbConn = new PDO("url:port", "username", "pass")
```

Then you can use ```$dbConn``` to interact with our database. For more help
with using PDO, go to PHP's official documentation:

http://php.net/manual/en/book.pdo.php

TODO(nadavash): Finish this section.
