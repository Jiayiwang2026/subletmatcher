import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'database-1.c9ukuiw0o2or.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Wjy20031211',
    database: 'subletmatcher',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;

