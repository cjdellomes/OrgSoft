/*
  Syntax Notes:
  • single quotes \' are strings
  • double quotes \" are column identifiers (reference column names)
*/

/*
  • adding a line with EXPLAIN ANALYZE before a query
  will print out each step that postgres takes for running the query
  as well as the time it took to run the query
  (it will explain everything that is run until the next semicolon ';')

  EXPLAIN ANALYZE
  SELECT type, comment, link, checked FROM notification WHERE id IN (
    SELECT notification_id FROM receive_notification WHERE user_id = 1
  ) ORDER BY id;
  INSERT INTO notification (type) VALUES (1); -- won't explain analyze this

*/

/*

   Create index for fields that are searched from the application side
   Example: names, phone numbers

   create alternateID's  1-to-many relationship
    1 person associated with many id's
    driver's license
    Social security number
    passport

    If you are searching for it on the application side, should
    index it on database side to make search faster


    For queryBuilding:
    "adhoc reporting for postgres"
    collects dictionary data (data about the datastructure)
    displays the data and can shop around
    can build your own report

    MySQL has more resources for best practices, more popular
    Postgres has enterprise level version


    Can secure with SSL using a free SSL certificate
    company called LetsEncrypt - completely trustworthy!!!

    LAMP environment - pre-packaged but can't really change shell
    usually given when signing up with a host provider


    Database encryption encrypts the files

    tables are a logical structure, stored as a file in the database
    server file system

    encrypt the database data files (which hold the tables and
    storage information)

    encrypt the os file system encryption, encrypts the os files
    makes the os less agile though, so instead protect
    the os from the network, keep all the ports closed, only
    open those needed for data transfer

    if you protect os network side, don't have to encrypt the os
    every time you encrypt it slows down the system

    Recommends AWS
    -pick 6 or 7 availability zone
    -deploy into one zone
    -each zone has 4 data centers
    -your system is gauranteed to be in 2 datacenters
    at any given moment, so don't have to worry
    about back-ups!
    -can extend service, pay extra to live in more avaibility zones
    makes requests faster

    can ask support about back-ups

    * Make sure Heroku can access AWS console

    Bitnami - has Marketplace

*/

DROP TABLE IF EXISTS company;

CREATE TABLE company (
  id SERIAL PRIMARY KEY,
  name varchar(100) NOT NULL,
  register_date date NOT NULL
);

INSERT INTO company (name, register_date) VALUES ('OrgSoft', '2017-01-01');

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  company_id integer REFERENCES company (id),
  username varchar(45) NOT NULL,
  hashed_password varchar(70) NOT NULL,
  is_admin boolean NOT NULL
);

-- inserting user 'test' to login with password 'passwordisnone'
INSERT INTO users (company_id, username, hashed_password, is_admin) VALUES (1, 'test', '$2a$10$DAInVRGKZJ4pmb64YDJxXe2zgt4N3/FbxHkhC23yv8Dwv0uHeov6u', true);

DROP TABLE IF EXISTS timecard;

CREATE TABLE timecard (
  id SERIAL PRIMARY KEY,
  start_date date NOT NULL,
  end_date date NOT NULL,
  employee_signed boolean NOT NULL,
  admin_signed boolean NOT NULL
);

INSERT INTO timecard (start_Date, end_date, employee_signed, admin_signed) VALUES ('2017-01-01', '2017-01-14', true, true);

DROP TABLE IF EXISTS time_record;

CREATE TABLE time_record (
  id SERIAL PRIMARY KEY,
  timecard_id integer REFERENCES timecard (id),
  date date NOT NULL,
  time time NOT NULL,
  type varchar(25) NOT NULL
);

INSERT INTO time_record (timecard_id, date, time, type) VALUES (1, '2017-01-02', '07:30:00', 'In');
INSERT INTO time_record (timecard_id, date, time, type) VALUES (1, '2017-01-02', '12:00:05', 'Meal Out');
INSERT INTO time_record (timecard_id, date, time, type) VALUES (1, '2017-01-02', '13:00:00', 'Meal In');
INSERT INTO time_record (timecard_id, date, time, type) VALUES (1, '2017-01-02', '04:30:00', 'Out');

DROP TABLE IF EXISTS file;

--Type choices: profile_picture, photo, document, compressed
CREATE TABLE file (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users (id),
  name varchar(45) DEFAULT NULL,
  type varchar(30) DEFAULT NULL,
  date date DEFAULT NULL,
  base_64_string varchar DEFAULT NULL
);

DROP TABLE IF EXISTS settings;

CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users (id),
  settings_data jsonb DEFAULT NULL
);

INSERT INTO settings (user_id, settings_data) VALUES (1, '{ "default": true, "primary": true, "success": true, "info": true, "warning": false, "danger": false }');