const mysql = require('mysql2/promise');

const insertData = async function (table, object,pool) {
    const {
        title,
        link,
        pageImages,
        rate,
        equipment,
        year,
        capacity,
        transmission,
        body,
        mileage,
        auction,
        lot,
        status,
        date,
        lastBet,
    } = object;

    const sqlQuery = `
        INSERT INTO ${table} (title, link, rate, equipment, year, capacity, transmission, body, mileage, auction, lot, status, date, lastBet, pageImages)
        VALUES (
            '${title}',
            '${link}',
            '${rate}',
            '${equipment}',
            ${year},
            '${capacity}',
            '${transmission}',
            '${body}',
            '${mileage}',
            '${auction}',
            ${lot},
            '${status}',
            '${date}',
            '${lastBet}',
            '${JSON.stringify(pageImages)}'
    )
    ON DUPLICATE KEY UPDATE
    title = VALUES(title),
    rate = VALUES(rate),
    equipment = VALUES(equipment),
    year = VALUES(year),
    capacity = VALUES(capacity),
    transmission = VALUES(transmission),
    body = VALUES(body),
    mileage = VALUES(mileage),
    auction = VALUES(auction),
    lot = VALUES(lot),
    status = VALUES(status),
    date = VALUES(date),
    lastBet = VALUES(lastBet),
    pageImages = VALUES(pageImages);
`;
    const connection = await pool.getConnection();
    try {
        await connection.query(sqlQuery);

    } catch (error) {
        console.error('Error inserting data: ', error);
    } finally {
        await connection.release();
    }

};
const clearData = async function (arr, table,pool) {

    const keysToDelete = arr.map(obj => obj.link);

    const connection = await pool.getConnection();
    const escapedKeys = keysToDelete.map(id => connection.escape(id));
    const query = `DELETE FROM ${table} WHERE link NOT IN (${escapedKeys.join(', ')})`;

    try {
        await connection.query(query);

    } catch (error) {
        console.error('Error deleting data: ', error);
    } finally {
        await connection.release();
    }

};
const writeData = async function (arr, table) {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'stats',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
    arr = arr.filter((obj) =>  obj?.pageImages?.length);
    //await clearData(arr, table,pool);
    await Promise.all(arr.map((obj) => insertData(table, obj,pool)));
    await pool.end();
    console.log('Data written');

};
module.exports = writeData;