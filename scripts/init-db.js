const { Pool } = require("pg");

const connectionString = "postgres://postgres:qLKzxCYLHufcQHoPqJMRUpYXgFmLeDfQ@nozomi.proxy.rlwy.net:34045/railway";

const pool = new Pool({
    connectionString: connectionString,
});

async function initDB() {
    try {
        console.log("Connecting to DB...");
        const client = await pool.connect();

        console.log("Creating photos table if not exists...");
        await client.query(`
      CREATE TABLE IF NOT EXISTS photos (
        id SERIAL PRIMARY KEY,
        image_url TEXT NOT NULL,
        uploader_name TEXT,
        note TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        console.log("Table created/verified successfully.");
        client.release();
    } catch (err) {
        console.error("Error initializing DB:", err);
    } finally {
        pool.end();
    }
}

initDB();
