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

DROP TABLE IF EXISTS organization;

CREATE TABLE organization (
  id SERIAL PRIMARY KEY,
  name varchar(100) NOT NULL,
  register_date date NOT NULL
);

INSERT INTO organization (name, register_date) VALUES ('OrgSoft', '2017-01-01');
INSERT INTO organization (name, register_date) VALUES ('LMU', '2017-02-01');

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  org_id integer REFERENCES organization (id),
  sup_id integer REFERENCES users (id),
  username varchar(45) NOT NULL,
  hashed_password varchar(70) NOT NULL,
  first_name varchar(45) NOT NULL,
  last_name varchar(45) NOT NULL,
  display_name varchar(90) NOT NULL,
  is_admin boolean NOT NULL,
  flsa varchar(3) NOT NULL
);

-- inserting user 'test' to login with password 'passwordisnone'
INSERT INTO users (org_id, sup_id, username, hashed_password, first_name, last_name, display_name, is_admin, flsa) VALUES (1, null, 'test', '$2a$10$DAInVRGKZJ4pmb64YDJxXe2zgt4N3/FbxHkhC23yv8Dwv0uHeov6u', 'John', 'Doe', 'John Doe', true, 'E');
INSERT INTO users (org_id, sup_id, username, hashed_password, first_name, last_name, display_name, is_admin, flsa) VALUES (1, 1, 'test1', '$2a$06$nEwCWSFpeBrSih3vaK8xEeeT7ONoVD/79a72xdY7SqLp22sAA4KqG', 'Steve', 'Smith', 'Steve Smith', false, 'N');
INSERT INTO users (org_id, sup_id, username, hashed_password, first_name, last_name, display_name, is_admin, flsa) VALUES (1, 1, 'test2', '$2a$06$0ZFrkk6fixf3qIWML32rquwTSayMI3JiVGg7bpuePvc.PlPiy3XlW', 'Adam', 'Doe', 'Adam Doe', false, 'N');
INSERT INTO users (org_id, sup_id, username, hashed_password, first_name, last_name, display_name, is_admin, flsa) VALUES (1, 1, 'test3', '$2a$06$k5IdDic3/4g3KugxIH3/qe9Fv1EWJZQHcctAwiF4N/45lSU6mGN.u', 'Owen', 'Levi', 'Owen Levi', false, 'N');
INSERT INTO users (org_id, sup_id, username, hashed_password, first_name, last_name, display_name, is_admin, flsa) VALUES (1, 1, 'test4', '$2a$06$agy2l3SUmPrrHSgVOkceu.suqIQVTo/Evxi/9Baur3pu90TvxWV4i', 'Bob', 'John', 'Bob John', false, 'N');
INSERT INTO users (org_id, sup_id, username, hashed_password, first_name, last_name, display_name, is_admin, flsa) VALUES (2, null, 'test5', '$2a$06$DzKHJFZ7SjlosoEZSa3Zse5MxurqWV3JTwuRsn6i.hOntvvdu9PmC', 'Bob', 'John', 'Bob John', true, 'E');
INSERT INTO users (org_id, sup_id, username, hashed_password, first_name, last_name, display_name, is_admin, flsa) VALUES (2, 6, 'test6', '$2a$06$DzKHJFZ7SjlosoEZSa3Zse5MxurqWV3JTwuRsn6i.hOntvvdu9PmC', 'Alan', 'Davis', 'Alan Davis', false, 'N');

DROP TABLE IF EXISTS timecard;

CREATE TABLE timecard (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users (id),
  start_date date NOT NULL,
  end_date date NOT NULL,
  employee_signed boolean NOT NULL,
  admin_signed boolean NOT NULL
);

INSERT INTO timecard (user_id, start_date, end_date, employee_signed, admin_signed) VALUES (1, '2017-01-01', '2017-01-14', true, true);
INSERT INTO timecard (user_id, start_date, end_date, employee_signed, admin_signed) VALUES (1, '2017-01-15', '2017-01-29', true, true);
INSERT INTO timecard (user_id, start_date, end_date, employee_signed, admin_signed) VALUES (2, '2017-01-01', '2017-01-14', true, true);
INSERT INTO timecard (user_id, start_date, end_date, employee_signed, admin_signed) VALUES (2, '2017-01-15', '2017-01-29', true, true);
INSERT INTO timecard (user_id, start_date, end_date, employee_signed, admin_signed) VALUES (3, '2017-01-01', '2017-01-14', true, true);
INSERT INTO timecard (user_id, start_date, end_date, employee_signed, admin_signed) VALUES (3, '2017-01-15', '2017-01-29', true, true);
INSERT INTO timecard (user_id, start_date, end_date, employee_signed, admin_signed) VALUES (4, '2017-01-01', '2017-01-14', true, true);
INSERT INTO timecard (user_id, start_date, end_date, employee_signed, admin_signed) VALUES (4, '2017-01-15', '2017-01-29', true, true);
INSERT INTO timecard (user_id, start_date, end_date, employee_signed, admin_signed) VALUES (7, '2017-01-15', '2017-01-29', true, true);

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

DROP TABLE IF EXISTS review;

CREATE TABLE review (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users (id),
  date date NOT NULL,
  next_review_date date NOT NULL,
  days_until_review integer NOT NULL,
  status varchar(25) NOT NULL
);

INSERT INTO review (user_id, date, next_review_date, days_until_review, status) VALUES (1, '2016-01-01', '2015-01-31', -100, 'Future Review');
INSERT INTO review (user_id, date, next_review_date, days_until_review, status) VALUES (1, '2017-01-01', '2018-01-31', 100, 'Future Review');
INSERT INTO review (user_id, date, next_review_date, days_until_review, status) VALUES (2, '2017-02-01', '2018-02-28', 200, 'Future Review');
INSERT INTO review (user_id, date, next_review_date, days_until_review, status) VALUES (3, '2017-03-01', '2018-03-31', 200, 'Future Review');
INSERT INTO review (user_id, date, next_review_date, days_until_review, status) VALUES (4, '2017-04-01', '2018-04-30', 200, 'Future Review');
INSERT INTO review (user_id, date, next_review_date, days_until_review, status) VALUES (5, '2017-05-01', '2018-05-31', 200, 'Future Review');
INSERT INTO review (user_id, date, next_review_date, days_until_review, status) VALUES (6, '2017-04-01', '2018-04-30', 200, 'Future Review');
INSERT INTO review (user_id, date, next_review_date, days_until_review, status) VALUES (7, '2017-05-01', '2018-05-31', 200, 'Future Review');