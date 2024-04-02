# Client-side:
Vite + React
CSS frameworks: TailwindCSS, Flowbite

# Serverside:
Nodejs (Expressjs), DB : Oracle SQL

Authentication:
jwt (jsonwebtoken) for tokenizing, bcrypt for pass hashing (better to use than MD5, SHA or other related hashing functions)


# initiating the database (Oracle)
In SQL Plus or SQL developer or Datagrip (DG recommended),
login to your default (sysdba) profile,

then, switch to pdb container:

```
alter session set container=orclpdb;
alter pluggable database orclpdb save state;
```

Now, create a user named ADMIN with pass ADMIN (you can set anything here but you need to change it in the authConfig var in SERVER/config.js):

```
CREATE USER ADMIN IDENTIFIED BY ADMIN;
GRANT ALL PRIVILEGES;
```

Now create the databases for needed for the CRUD app:

## TaskList db

```
CREATE TABLE TaskList (
   "uid" NUMBER PRIMARY KEY,
   "platform" VARCHAR2(15),
   "taskURL" VARCHAR2(100) NOT NULL,
   "taskName" VARCHAR2(50) NOT NULL,
   "status" VARCHAR2(50) DEFAULT 'Pending',
   "note" VARCHAR2(300) DEFAULT 'NONE',
   "userID" NUMBER NOT NULL
);
```

Commit and then :
Sequence & Trigger for TaskList:

```
CREATE SEQUENCE TaskList_Seq
    START WITH 1
    INCREMENT BY 1
    NOMAXVALUE;
CREATE OR REPLACE TRIGGER TaskList_BI
BEFORE INSERT ON TaskList
FOR EACH ROW
BEGIN
    SELECT TaskList_Seq.NEXTVAL
    INTO :NEW."uid"
    FROM dual;
END;
```

## USERS db

```
CREATE TABLE USERS(
    userid NUMBER PRIMARY KEY,
    email VARCHAR2(100),
    password VARCHAR2(100) NOT NULL,
    image VARCHAR2(50),
    fullname VARCHAR2(50) NOT NULL,
);
```

Add sequence & trigger:

```
CREATE SEQUENCE Users_Seq
    START WITH 1
    INCREMENT BY 1
    NOMAXVALUE;

-- Create trigger for USERS
CREATE OR REPLACE TRIGGER Users_BI
BEFORE INSERT ON USERS
FOR EACH ROW
BEGIN
    SELECT Users_Seq.NEXTVAL
    INTO :NEW.userid
    FROM dual;
END;
```

Now add the foreign key (userid) to TaskLists from USERS:

```
ALTER TABLE TaskList
ADD CONSTRAINT fk_user
FOREIGN KEY (userID)
REFERENCES USERS(userid);
```

if SQL Plus can't execute this properly, insert using Datagrip or vscode's oracle sql extension (much easier)

If you're storing USERS & TaskList in separate accounts/databases,
then you need to establish a link between the databases before doing this,

```
CREATE DATABASE LINK remote_db
CONNECT TO remote_user IDENTIFIED BY password
USING 'remote_database_tns_alias';
```


## ignore the following, more efficient method is used instead of it
Now create the triggers to update the values of task info upon insertion/update of task & it's status:

```
-- Trigger to increment TotalTasks when a new task is inserted
CREATE OR REPLACE TRIGGER increment_total_tasks
AFTER INSERT ON TaskList
FOR EACH ROW
BEGIN
    UPDATE TaskList
    SET TotalTasks = TotalTasks + 1
    WHERE "uid" = :new."uid";
END;
/

-- Trigger to decrement TotalTasks when a task is deleted
CREATE OR REPLACE TRIGGER decrement_total_tasks
AFTER DELETE ON TaskList
FOR EACH ROW
BEGIN
    UPDATE TaskList
    SET TotalTasks = TotalTasks - 1
    WHERE "uid" = :old."uid";
END;
/


-- Trigger to handle PendingTask auto-increment and auto-decrement
CREATE OR REPLACE TRIGGER pending_task_trigger
BEFORE INSERT OR UPDATE ON TaskList
FOR EACH ROW
BEGIN
    IF :new.status = 'Pending' THEN
        :new.PendingTask := :new.PendingTask + 1;
    ELSIF :old.status = 'Pending' THEN
        :new.PendingTask := :new.PendingTask - 1;
    END IF;
END;
/

-- Trigger to handle DoneTask auto-increment and auto-decrement
CREATE OR REPLACE TRIGGER done_task_trigger
BEFORE INSERT OR UPDATE ON TaskList
FOR EACH ROW
BEGIN
    IF :new.status IN ('Solved', 'Done') THEN
        :new.DoneTask := :new.DoneTask + 1;
    ELSIF :old.status IN ('Solved', 'Done') THEN
        :new.DoneTask := :new.DoneTask - 1;
    END IF;
END;
/

-- Trigger to handle AttemptedTask auto-increment and auto-decrement
CREATE OR REPLACE TRIGGER attempted_task_trigger
BEFORE INSERT OR UPDATE ON TaskList
FOR EACH ROW
BEGIN
    IF :new.status = 'Attempted' THEN
        :new.AttemptedTask := :new.AttemptedTask + 1;
    ELSIF :old.status = 'Attempted' THEN
        :new.AttemptedTask := :new.AttemptedTask - 1;
    END IF;
END;
/

-- Trigger to handle RevisitTask auto-increment and auto-decrement
CREATE OR REPLACE TRIGGER revisit_task_trigger
BEFORE INSERT OR UPDATE ON TaskList
FOR EACH ROW
BEGIN
    IF :new.status = 'Revisit' THEN
        :new.RevisitTask := :new.RevisitTask + 1;
    ELSIF :old.status = 'Revisit' THEN
        :new.RevisitTask := :new.RevisitTask - 1;
    END IF;
END;
/

```

