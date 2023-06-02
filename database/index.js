require('dotenv').config();
const { Client } = require('pg');

console.log(process.env.PASSWORD);
const client = new Client({
  user: process.env.USERNAME,
  host: process.env.PG_HOST,
  database: process.env.DATABASE_NAME,
  port: process.env.PORT,
  password: process.env.PASSWORD,
});

client.connect();
console.log('client connected to database', client.database);
module.exports = client;
