const mysql = require('mysql2/promise');

const insertData = async function (table, object,pool) {
    const {
        link,
        name,
        year,
        color,
        startPrice,
        auction,
        body,
        engine,
        auctionDate,
        complectation,
        mileage,
        rate,
        productionDate,
        lot,
        translateAudio,
        translateText,
        pageImages,


    } = object;

    const sqlQuery = `
        INSERT INTO ${table} (link, name, year, color, startPrice, auction, body, engine, auctionDate, complectation, mileage, rate, productionDate, lot, translateAudio, translateText, pageImages)
        VALUES (
            '${link}',
            '${name}',
            '${year}',
            '${color}',
            '${startPrice}',
            '${auction}',
            '${body}',
            '${engine}',
            '${auctionDate}',
            '${complectation}',
            '${mileage}',
            '${rate}',
            '${productionDate}',
            '${lot}',
            '${translateAudio}',
            '${translateText}',
            '${JSON.stringify(pageImages)}'
    )
    ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    year = VALUES(year),
    color = VALUES(color),
    startPrice = VALUES(startPrice),
    auction = VALUES(auction),
    body = VALUES(body),
    engine = VALUES(engine),
    auctionDate = VALUES(auctionDate),
    complectation = VALUES(complectation),
    rate = VALUES(rate),
    productionDate = VALUES(productionDate),
    lot = VALUES(lot),
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
    console.log(arr);
    await Promise.all(arr.map((obj) => insertData(table, obj,pool)));
    await pool.end();
    console.log('Data written');

};
module.exports = writeData;
