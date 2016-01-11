CREATE DATABASE info344chat;

USE info344chat;

CREATE TABLE message (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nickname char(50),
    content TEXT NOT NULL,
    sent_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO message (nickname, content)
VALUES
    (NULL, "Hello, world!"),
    ("john doe", "Hi there...")
