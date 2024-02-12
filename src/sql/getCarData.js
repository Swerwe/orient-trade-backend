const mysql = require('mysql2/promise');
const prepareObject = require('./helpers/prepareObject');
const getCarData = async function(id){
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'stats',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
    try{
        const connection = await pool.getConnection();
        const [statRows] = await connection.query(`SELECT * FROM statistics WHERE link = 'https://jpcenter.ru/aj-${id}.htm';`);
        const [aucRows] = await connection.query(`SELECT * FROM auctions WHERE link = 'https://jpcenter.ru/aj-${id}.htm';`);
        const result = [...statRows,...aucRows].map(prepareObject);
        console.log(result);
        if (result.length === 1) return result;
        return [];

    } catch(error){
        console.error('Error executing query: ' + error.stack);
    }finally{
        await pool.end();
    }

    
};
module.exports = getCarData;