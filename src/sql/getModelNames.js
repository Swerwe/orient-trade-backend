const mysql = require('mysql2/promise');
const getCarData = async function(table, marka){
    if (!marka) return [];
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
        const [rows] = await connection.query(
        `SELECT SUBSTRING(title, INSTR('title', ' ') + 1) AS model, COUNT(*) AS count
        FROM ${table}
        WHERE SUBSTRING_INDEX(title, ' ', 1)='${marka}'
        GROUP BY SUBSTRING(title, INSTR('title', ' ') + 1);`);
        const result = {};
        rows.forEach((obj) => {
            const marka = obj.model.substring(obj.model.indexOf(' ') + 1);
            result[marka] = obj.count;
        });
        return result;
    } catch(error){
        console.error('Error executing query: ' + error.stack);
    }finally{
        await pool.end();
    }

    
};
module.exports = getCarData;