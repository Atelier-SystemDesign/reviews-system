DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS characteristic_reviews;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS reviews_photos;



CREATE TABLE IF NOT EXISTS reviews(
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(product_id),
  rating INTEGER,
  date TIMESTAMP,
  summary VARCHAR(255),
  body VARCHAR(255),
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(255),
  reviewer_email VARCHAR(255),
  response VARCHAR(255),
  helpfulness INTEGER DEFAULT 0);


  CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL PRIMARY KEY
);


CREATE TABLE IF NOT EXISTS characteristic_reviews (
    id SERIAL PRIMARY KEY,
    characteristic_id INTEGER REFERENCES characteristics(id),
    review_id INTEGER REFERENCES reviews(id),
value INTEGER);


CREATE TABLE IF NOT EXISTS characteristics (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id),
    name VARCHAR(255));

CREATE TABLE IF NOT EXISTS reviews_photos (
    id SERIAL PRIMARY KEY,
    review_id INTEGER REFERENCES revies,
    url VARCHAR(255));

