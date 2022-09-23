drop database if exists tn_db;
create database tn_db default character set utf8 collate utf8_unicode_ci;
use tn_db;

CREATE TABLE IF NOT EXISTS _user (
    _id CHARACTER(50) PRIMARY KEY,
    _name TEXT,
    _birthday TEXT,
    _phone TEXT,
    _avatar TEXT,
    _gender TEXT,
    _seat_position TEXT,
    _delegation TEXT,
    _role TEXT
);



CREATE TABLE IF NOT EXISTS _check_in (
    _id CHARACTER(50) PRIMARY KEY,
    _user_id CHARACTER(50),
    _event INT,
    _state BOOLEAN,
    CONSTRAINT pk_1 FOREIGN KEY (_user_id)
        REFERENCES _user (_id)
);


CREATE TABLE IF NOT EXISTS _post (
    _id CHARACTER(50) PRIMARY KEY,
    _title TEXT,
    _time TEXT,
    _des TEXT,
    _img_preview TEXT,
    _content TEXT,
    _category TEXT,
    _url TEXT
);

CREATE TABLE IF NOT EXISTS _catalog (
    _id CHARACTER(50) PRIMARY KEY,
    _name TEXT,
    _pdf TEXT,
    _title TEXT,
    _des TEXT
);