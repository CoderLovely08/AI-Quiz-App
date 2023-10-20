// db.js
import { config } from 'dotenv'
config();

import pg from 'pg';

const pool = new pg.Pool({
    user: process.env.DB_USER,         // Your PostgreSQL user
    host: process.env.DB_HOST,         // Your PostgreSQL host
    database: process.env.DB_DATABASE, // Your PostgreSQL database
    password: process.env.DB_PASSWORD, // Your PostgreSQL password
    port: process.env.DB_PORT,         // Your PostgreSQL port
    max: 10,                           // Maximum number of clients in the pool
    idleTimeoutMillis: 30000,          // How long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 20000,     // How long to try to connect before timing out
});
try {
    pool.connect().then(() => {
        console.log("Connected to DB");
    }).catch((error) => {
        console.log("Error connecting DB", error);
    })
} catch (error) {
    console.log(error);
}
export default pool;
