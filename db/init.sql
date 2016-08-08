CREATE TABLE testtable (
    title       varchar(40) NOT NULL,
    date_entered   timestamp
);

INSERT INTO testtable Values ('Test1', '8/3/2016 12:45:00');
INSERT INTO testtable Values ('Test2', '8/4/2016 3:03:15');
INSERT INTO testtable Values ('Test3', '8/5/2016 3:03:15');


CREATE TABLE templatetable (
    ID serial primary key,
    parentTemplateId integer NULL,
    data varchar(200),
    name varchar(40)
);

INSERT INTO templatetable (parentTemplateId, data, name) Values (null, 'test Data', 'Test Name');