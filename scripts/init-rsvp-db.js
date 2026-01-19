const { Pool } = require("pg");

const connectionString = "postgres://postgres:qLKzxCYLHufcQHoPqJMRUpYXgFmLeDfQ@nozomi.proxy.rlwy.net:34045/railway";

const pool = new Pool({
    connectionString: connectionString,
});

async function initRSVPDB() {
    try {
        console.log("Connecting to DB...");
        const client = await pool.connect();

        console.log("Creating rsvps table if not exists...");
        await client.query(`
      CREATE TABLE IF NOT EXISTS rsvps (
        id SERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        phone_number TEXT,
        guest_count INTEGER DEFAULT 1,
        attending BOOLEAN NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        console.log("RSVP Table created/verified successfully.");
        client.release();
    } catch (err) {
        console.error("Error initializing RSVP DB:", err);
    } finally {
        pool.end();
    }
}

initRSVPDB();
