-- delete the lookout_db database if it already exists
DROP DATABASE IF EXISTS lookout_db;

-- create a new database named lookout_db
CREATE DATABASE lookout_db;

-- use the lookout_db database
USE lookout_db;

-- create a table named user_date to store the user specific data
CREATE TABLE user_data
(
    id INT(255)
    AUTO_INCREMENT NOT NULL,
    -- user's first name
    firstname VARCHAR
    (255) NOT NULL,
    -- user's last name
    lastname VARCHAR
    (255) NOT NULL,
    -- username
    username VARCHAR
    (255) NOT NULL,
    -- hashed password
    hashedpw VARCHAR
    (255) NOT NULL,
    -- user's email address
    email VARCHAR
    (255) NOT NULL,
    -- most recent default location - saved each time a user logs in (overwrites previous)
    defaultlocation VARCHAR
    (255),
    -- user's favorites
    favorites VARCHAR
    (255),
    -- date and time the user was created
    created DATETIME,
    -- date and time the user's information was last updated
    updated DATETIME,
    -- date and time the user last logged in
    lastlogin DATETIME,
    PRIMARY KEY
    (id)
);

