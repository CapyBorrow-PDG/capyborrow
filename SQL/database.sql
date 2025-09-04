DROP TABLE IF EXISTS Capyborrow.user CASCADE;
DROP TABLE IF EXISTS Capyborrow.item CASCADE;
DROP TABLE IF EXISTS Capyborrow.geolocation CASCADE;
DROP TABLE IF EXISTS Capyborrow.review CASCADE;
DROP TABLE IF EXISTS Capyborrow.borrow CASCADE;
DROP TABLE IF EXISTS Capyborrow.itemcollection CASCADE;
DROP TABLE IF EXISTS Capyborrow.collecteditem CASCADE;

--USER

CREATE TABLE Capyborrow.user (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    firstname VARCHAR(20),
    lastname VARCHAR(20),
    email VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(200),
    points INT NOT NULL DEFAULT 200, -- 200 points à la création
    picture VARCHAR(200)
);

-- ITEM

CREATE TABLE Capyborrow.item (
    item_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(200),
    price INT NOT NULL,
    state VARCHAR(15) NOT NULL,
    mean_rating REAL,
    owner_id INT NOT NULL REFERENCES Capyborrow.user(user_id),
    is_available BOOLEAN NOT NULL DEFAULT true, -- l'utilisateur peut le rendre imprêtable
    category1 VARCHAR(20),
    category2 VARCHAR(20),
    start_date DATE,
    end_date DATE,
    picture VARCHAR(200) NOT NULL
    --longitude REAL NOT NULL,
    --latitude REAL NOT NULL

);

-- GEOLOCATION

CREATE TABLE Capyborrow.geolocation (
  geolocation_id SERIAL PRIMARY KEY,
  item_id INT NOT NULL REFERENCES Capyborrow.item(item_id),
  city VARCHAR(100) NOT NULL,
  canton_or_state VARCHAR(100) NOT NULL,
  longitude REAL NOT NULL,
  latitude REAL NOT NULL
);

-- REVIEW

CREATE TABLE Capyborrow.review (
    review_id SERIAL PRIMARY KEY,
    item_id INT NOT NULL REFERENCES Capyborrow.item(item_id),
    author_id INT NOT NULL REFERENCES Capyborrow.user(user_id),
    rating REAL NOT NULL CHECK (rating > 0 AND rating <= 5),
    comment VARCHAR(200)
);

-- EMPRUNT

CREATE TABLE Capyborrow.borrow (
    borrow_id SERIAL PRIMARY KEY,
    item_id INT NOT NULL REFERENCES Capyborrow.item(item_id),
    owner_id INT NOT NULL REFERENCES Capyborrow.user(user_id),
    borrower_id INT NOT NULL REFERENCES Capyborrow.user(user_id),
    start_date DATE NOT NULL CHECK (start_date >= CURRENT_DATE),
    end_date DATE NOT NULL CHECK (end_date >= start_date),
    first_code VARCHAR(20),
    second_code VARCHAR(20),
    borrow_ended BOOLEAN NOT NULL DEFAULT false --pour gérer les item rendu en retard

);

-- COLLECTIONS

CREATE TABLE Capyborrow.itemcollection (
  collection_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  owner_id INT NOT NULL REFERENCES Capyborrow.user(user_id)
);

CREATE TABLE Capyborrow.collecteditem (
  item_id INT NOT NULL REFERENCES Capyborrow.item(item_id),
  collection_id INT NOT NULL REFERENCES Capyborrow.itemcollection(collection_id)
);


-- ADD people,items...

INSERT INTO Capyborrow.user(username, firstname, lastname, email, description)
VALUES('Davtek', 'David', 'Berger', 'david.berger@heig-vd.ch', 'Je vous prete mes objets');

INSERT INTO Capyborrow.user(username, firstname, lastname, email)
VALUES('usernameXx', 'firstname', 'lastname', 'firstname.lastname@heig-vd.ch');

INSERT INTO Capyborrow.user(username, firstname, lastname, email)
VALUES('IHateEverything', 'John', 'Doe', 'John.Doe@gmail.com');

INSERT INTO Capyborrow.user(email)
VALUES('test@gmail.com');

INSERT INTO Capyborrow.item(name, description, price, state, owner_id, category1, start_date, end_date, picture)
VALUES('Aspirateur', 'ca nettoie ici', 50, 'very good', 1, 'Electronics', '2025-04-05', '2025-11-08', '../assets/images/aspirateur.png');

INSERT INTO Capyborrow.item(name, description, price, state, owner_id, category1, start_date, end_date, picture)
VALUES('Appareil à Raclette', 'miam', 40, 'good', 2, 'Cooking', '2025-06-05', '2025-09-08', '../assets/images/raclette.jpg');

INSERT INTO Capyborrow.item(name, description, price, state, owner_id, category1, start_date, end_date, picture)
VALUES('Chargeur USB-C', 'ca charge ici', 20, 'very good', 1, 'Electronics', '2025-05-05', '2025-10-08', '../assets/images/chargeur.jpg');

INSERT INTO Capyborrow.item(name, description, price, state, owner_id, start_date, end_date, picture)
VALUES('Balai', 'ca nettoie ici', 10, 'used', 2, '2025-08-30', '2025-09-12', '../assets/images/balai.jpg');

INSERT INTO Capyborrow.item(name, description, price, state, owner_id, category1, start_date, end_date, picture)
VALUES('Rice Cooker', 'riz', 50, 'good', 1, 'Electronics', '2025-09-05', '2025-09-08', '../assets/images/rice-cooker.jpg');

INSERT INTO Capyborrow.borrow(item_id, owner_id, borrower_id, start_date, end_date)
VALUES(1, 1, 2, '2025-09-05', '2025-09-07');

INSERT INTO Capyborrow.itemcollection(name, owner_id)
VALUES('test collection', 2);

INSERT INTO Capyborrow.collecteditem(item_id, collection_id)
VALUES(2, 1);

INSERT INTO Capyborrow.review(item_id, author_id, rating, comment)
VALUES(1, 2, 4, 'Great article !');

INSERT INTO Capyborrow.review(item_id, author_id, rating, comment)
VALUES(1, 3, 2, 'Not as described.');

-- VIEWS

-- Futur emprunt
-- query js : SELECT start_date, end_date FROM Capyborrow.item_future_borrow_dates WHERE item_id = $1;
CREATE OR REPLACE VIEW Capyborrow.future_borrow_dates AS
SELECT 
    item_id,
    start_date,
    end_date
FROM Capyborrow.borrow
WHERE end_date >= CURRENT_DATE;

-- ALL ITEMS
CREATE OR REPLACE VIEW Capyborrow.all_items_display AS
SELECT DISTINCT ON (i.item_id)
    i.item_id,
    i.name,
    i.description,
    i.price,
    i.state,
    i.mean_rating,
    i.is_available,
    i.owner_id,
    u.username,
    i.category1,
    i.category2,
    i.start_date,
    i.end_date,
    i.picture,
    g.city,
    g.canton_or_state
FROM Capyborrow.item AS i
LEFT JOIN Capyborrow.geolocation AS g USING(item_id)
LEFT JOIN Capyborrow.user AS u ON i.owner_id = u.user_id;

-- ALL BORROWS
CREATE OR REPLACE VIEW Capyborrow.all_borrows AS
SELECT DISTINCT ON (b.borrow_id)
    b.borrow_id,
    b.item_id,
    b.borrower_id,
    i.name,
    i.price,
    i.state,
    i.is_available,
    i.picture
FROM Capyborrow.borrow AS b
LEFT JOIN Capyborrow.all_items_display AS i USING(item_id);

-- REVIEWS

CREATE OR REPLACE VIEW Capyborrow.all_reviews AS
SELECT DISTINCT ON (r.review_id)
  r.*,
  u.username
FROM Capyborrow.review AS r
LEFT JOIN Capyborrow.user AS u ON r.author_id = u.user_id;
