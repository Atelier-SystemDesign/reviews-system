require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE_NAME,
  port: process.env.PORT,
  password: process.env.PASSWORD,
});

client.connect();
console.log('client connected to database', client.database);
// console.log(process.env.DATABASE_NAME, 'ENV');
// console.log('db', process.env.DATABASE_NAME);
// client.connect().then(() => client.query(`CREATE TABLE IF NOT EXISTS reviews(
//   id SERIAL PRIMARY KEY,
//   product_id INTEGER REFERENCES products(product_id),
//   rating INTEGER,
//   date TIMESTAMP,
//   summary VARCHAR(255),
//   body VARCHAR(255),
//   recommend BOOLEAN,
//   reported BOOLEAN,
//   reviewer_name VARCHAR(255),
//   reviewer_email VARCHAR(255),
//   response VARCHAR(255),
//   helpfulness INTEGER DEFAULT 0);`))
//   .then(() => client.query(`CREATE TABLE IF NOT EXISTS products (
//   product_id SERIAL PRIMARY KEY
// );`))
//   .then(() => client.query(`CREATE TABLE IF NOT EXISTS reviews_photos (
//     id SERIAL PRIMARY KEY,
//     review_id INTEGER REFERENCES reviews(id),
//     url VARCHAR(255));`))
//   .then(() => client.query(`CREATE TABLE IF NOT EXISTS characteristic_reviews (
//     id SERIAL PRIMARY KEY,
//     characteristic_id INTEGER REFERENCES characteristics(id),
//     review_id INTEGER REFERENCES reviews(id),
//     value INTEGER);`))
//   .then(() => client.query(`CREATE TABLE IF NOT EXISTS characteristics (
//     id SERIAL PRIMARY KEY,
//     product_id INTEGER REFERENCES products(product_id),
//     name VARCHAR(255));`))
//   .then(() => {
//     console.log('tables are created');
//     client.end();
//   })
//   .catch((err) => {
//     console.log('query error', err.message);
//     client.end();
//   });

// client.end();
module.exports = client;
