DROP TABLE IF EXISTS Capyborrow.user CASCADE;
DROP TABLE IF EXISTS Capyborrow.item CASCADE;
DROP TABLE IF EXISTS Capyborrow.review CASCADE;
DROP TABLE IF EXISTS Capyborrow.borrow CASCADE;
DROP TABLE IF EXISTS Capyborrow.like CASCADE;
DROP TABLE IF EXISTS Capyborrow.picture CASCADE;
DROP TABLE IF EXISTS Capyborrow.profile_picture CASCADE;
DROP TABLE IF EXISTS Capyborrow.item_picture CASCADE;

--USER

CREATE TABLE Capyborrow.user (
    user_id SERIAL PRIMARY KEY,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL,
    --localisation VARCHAR(20) NOT NULL,
    longitude REAL NOT NULL,
    latitude REAL NOT NULL,
    description VARCHAR(200),
    points INT NOT NULL DEFAULT 200 -- 200 points à la création
    --profile_picture VARCHAR(200) --URL de l'image
);

-- ITEM

CREATE TABLE Capyborrow.item (
    item_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(200),
    price INT NOT NULL,
    state INT NOT NULL CHECK (state > 0 AND state <= 5),
    mean_rating REAL,
    owner_id INT NOT NULL REFERENCES Capyborrow.user(user_id),
    --is_available BOOLEAN NOT NULL DEFAULT true,
    category VARCHAR(20)
    --image VARCHAR(200) 

);

-- REVIEW

CREATE TABLE Capyborrow.review (
    review_id SERIAL PRIMARY KEY,
    item_id INT NOT NULL REFERENCES Capyborrow.item(item_id),
    author_id INT NOT NULL REFERENCES Capyborrow.user(user_id),
    rating INT NOT NULL CHECK (rating > 0 AND rating <= 5),
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

CREATE TABLE Capyborrow.like (
    like_id SERIAL PRIMARY KEY,
    item_id INT NOT NULL REFERENCES Capyborrow.item(item_id),
    liker_id INT NOT NULL REFERENCES Capyborrow.user(user_id)

);

CREATE TABLE Capyborrow.picture (
    picture_id SERIAL PRIMARY KEY,
    picture_URL VARCHAR(200) NOT NULL
);

CREATE TABLE Capyborrow.profile_picture (
    picture_id INT PRIMARY KEY REFERENCES Capyborrow.picture(picture_id),
    user_id INT UNIQUE REFERENCES Capyborrow.user(user_id) -- UNIQUE car 1 seul pp
);

CREATE TABLE Capyborrow.item_picture ( -- pour l'instant pas de limite du nombre d'image par objet
    picture_id INT PRIMARY KEY REFERENCES Capyborrow.picture(picture_id),
    item_id INT REFERENCES Capyborrow.item(item_id)
);

INSERT INTO Capyborrow.user(firstname, lastname, email, password, longitude, latitude, description)
VALUES('David', 'Berger', 'david.berger@heig-vd.ch', 'admin', 46.3100, 6.3200, 'Je vous prete mes objets');

INSERT INTO Capyborrow.user(firstname, lastname, email, password, longitude, latitude)
VALUES('firstname', 'lastname', 'firstname.lastname@heig-vd.ch', 'password', 46.3100, 6.3200);

INSERT INTO Capyborrow.item(name, description, price, state, owner_id, category)
VALUES('aspirateur', 'ca nettoie ici', 50, 4, 1, 'menage');

INSERT INTO Capyborrow.item(name, description, price, state, owner_id, category)
VALUES('appareil à raclette', 'miam', 40, 3, 2, 'nourriture');

INSERT INTO Capyborrow.borrow(item_id, owner_id, borrower_id, start_date, end_date)
VALUES(1, 1, 2, '2025-08-29', '2025-08-31');



-- VIEWS (AJOUTEZ LES DONNÉES VOULUES)

-- Voir tous les objets d'un utilisateur
-- query js : SELECT item_id FROM Capyborrow.user_items WHERE user_id = $1;
CREATE OR REPLACE VIEW Capyborrow.user_items AS
SELECT 
    owner_id AS user_id,
    item_id
FROM Capyborrow.item;

-- Voir toutes les reviews d'un objet
-- query js : SELECT reviews FROM Capyborrow.item_reviews WHERE item_id = $1;
CREATE OR REPLACE VIEW Capyborrow.item_reviews AS
SELECT 
    item_id,
    review_id
FROM Capyborrow.review;

-- Historique des emprunt
-- query js : SELECT item_id FROM Capyborrow.user_borrows WHERE user_id = $1;
CREATE OR REPLACE VIEW Capyborrow.user_borrows AS
SELECT 
    borrower_id AS user_id,
    item_id
FROM Capyborrow.borrow;

-- Futur emprunt
-- query js : SELECT start_date, end_date FROM Capyborrow.item_future_borrow_dates WHERE item_id = $1;
CREATE OR REPLACE VIEW Capyborrow.future_borrow_dates AS
SELECT 
    item_id,
    start_date,
    end_date
FROM Capyborrow.borrow
WHERE end_date >= CURRENT_DATE;