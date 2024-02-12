const mysql = require('mysql2/promise');
const getAllRates = async function(table){
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
        const [rows] = await connection.query(`SELECT DISTINCT rate AS rate FROM ${table}`);
        return rows.map(obj => obj.rate).filter(str =>/^[a-zA-Z0-9]+$/.test(str));
    } catch(error){
        console.error('Error executing query: ' + error.stack);
    }finally{
        await pool.end();
    }

    
};
module.exports = getAllRates;