const { drizzle } = require("drizzle-orm/vercel-postgres"); // Correct path without '@'
const { sql } = require("@vercel/postgres"); // Correct package name

const db = drizzle(sql);

module.exports = db;
