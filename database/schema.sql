DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS characteristic_reviews;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS reviews_photos;

CREATE TABLE IF NOT EXISTS reviews(
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  rating INTEGER,
  date BIGINT,
  summary TEXT,
  body TEXT,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(255),
  reviewer_email VARCHAR(255),
  response TEXT,
  helpfulness INTEGER DEFAULT 0);


CREATE TABLE IF NOT EXISTS characteristics (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    name VARCHAR(255));


CREATE TABLE IF NOT EXISTS characteristic_reviews (
    id SERIAL PRIMARY KEY,
    characteristic_id INTEGER REFERENCES characteristics(id),
    review_id INTEGER REFERENCES reviews(id),
    value INTEGER);


CREATE TABLE IF NOT EXISTS reviews_photos (
    id SERIAL PRIMARY KEY,
    review_id INTEGER REFERENCES reviews,
    url VARCHAR(255));


/**** COPY STATEMENTS ****/

COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM  '/Users/segue/Desktop/SDC/reviews-system/dataFiles/reviews.csv'
DELIMITER ',' CSV HEADER;

/**** updating null values ****/
UPDATE reviews
SET response= ''
WHERE response='null';

COPY characteristics(id, product_id, name)
FROM  '/Users/segue/Desktop/SDC/reviews-system/dataFiles/characteristics.csv'
DELIMITER ',' CSV HEADER;

COPY characteristic_reviews(id,  characteristic_id, review_id, value)
FROM  '/Users/segue/Desktop/SDC/reviews-system/dataFiles/characteristic_reviews.csv'
DELIMITER ',' CSV HEADER;

COPY reviews_photos(id,  review_id, url)
FROM  '/Users/segue/Desktop/SDC/reviews-system/dataFiles/reviews_photos.csv'
DELIMITER ',' CSV HEADER;