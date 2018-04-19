const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/crypho';

module.exports = Client(connectionString);