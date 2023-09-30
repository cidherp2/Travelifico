const msql = require("mysql2/promise");

const createDb = async () => {
    const conn = process.env.DATABASE_URL
        ? await msql.createConnection(process.env.DATABASE_URL)
        : await msql.createConnection({
            user: "root",
            password: "Telecaster12",
            host: "localhost"
        });

    const created = await conn.execute("CREATE DATABASE IF NOT EXISTS travelifico_db");
    return created;
};

module.exports = { createDb };