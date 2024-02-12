const mysql = require('mysql2/promise');
const getCapacityList = async function(table){
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
        const [rows] = await connection.query(`SELECT DISTINCT capacity AS capacity FROM ${table}`);
        return rows.map(obj => obj.capacity);
    } catch(error){
        console.error('Error executing query: ' + error.stack);
    }finally{
        await pool.end();
    }

    
};
module.exports = getCapacityList;