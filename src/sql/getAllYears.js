const mysql = require('mysql2/promise');
const getAllYears = async function(table){
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
        const [rows] = await connection.query(`SELECT DISTINCT year AS year FROM ${table}`);
        return rows.map(obj => obj.year);
    } catch(error){
        console.error('Error executing query: ' + error.stack);
    }finally{
        await pool.end();
    }

    
};
module.exports = getAllYears;