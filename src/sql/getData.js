const mysql = require('mysql2/promise');
const prepareObject = require('./helpers/prepareObject');
const sortObject = {
    'betup': 'ORDER BY lastBet ASC',
    'betdown': 'ORDER BY lastBet DESC',
};
const filterObject = {
    marka_name:(marka)=>`SUBSTRING_INDEX(title, ' ', 1) = '${marka}'`,
    model_name:(model)=>`SUBSTRING(title, INSTR('title', ' ') + 1) = '${model}'`,
    rate:(rate)=>`rate = '${rate}'`,
    mileage_from:(mileage)=>`CAST(mileage AS UNSIGNED) >= ${mileage}`,
    mileage_to:(mileage)=>`CAST(mileage AS UNSIGNED) <= ${mileage}`,
    year_from:(year)=>`CAST(year AS UNSIGNED) >= ${year}`,
    year_to:(year)=>`CAST(year AS UNSIGNED) <= ${year}`,
    capacity_from:(capacity) =>`CAST(capacity AS UNSIGNED) >= ${capacity}`,
    capacity_to:(capacity) =>`CAST(capacity AS UNSIGNED) <= ${capacity}`,
};
/*

            query.marka_name,
            query.model_name,
            query.rate,
            query.mileage_from,
            query.mileage_to,
            query.year_from,
            query.year_to
        ];
*/
const getData = async function(table, page, pageSize,query){
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
        const startIndex = (page - 1) * pageSize;
        const sort = query.sort;
        const filterString = Object.entries(query).filter(([key,value]) =>{
            return Object.prototype.hasOwnProperty.call(filterObject, key);
        }).filter(([,value]) => {
            return value !== "";
        })
        .map(([key,value]) => {
            if (key==="model_name"){
                if (!query.marka_name) return "";

                return filterObject[key](query.marka_name + " " + value); 

            }
            return filterObject[key](value); 
        }).join(" AND ");
        console.log(filterString);
        let [rows] = await connection.query(
        `SELECT *
        FROM (
            SELECT *
            FROM ${table}
            ${sortObject[sort] || ''}
        
        ) AS ordered
        ${filterString.length ? 'WHERE ' + filterString : ''} LIMIT ${pageSize} OFFSET ${startIndex};`);

        
        const [res] = await connection.query(`SELECT COUNT(*) AS count FROM ${table}`);
        const count = res[0].count;
        rows = rows.map(prepareObject);
        return [rows,Math.ceil(count/pageSize)]; 

    } catch(error){
        console.log(error);
    }finally{
        await pool.end();
    }

    
};
module.exports = getData;