/** Database for lunchly */

const pg = require("pg");

const db = new pg.Client("postgresql://postgres:2024@localhost/lunchly");
// 'postgresql://postgres:Ponderosa@localhost/blogly'

db.connect();

module.exports = db;
