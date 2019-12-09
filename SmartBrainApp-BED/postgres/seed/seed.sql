BEGIN TRANSACTION

INSERT into users (name, email, entries, joined)
values ('jessie', 'jessi@yahoo.com', 5, '2018-01-01');

COMMIT