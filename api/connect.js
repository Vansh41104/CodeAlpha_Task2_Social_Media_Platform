import mysql from 'mysql';

export const db=mysql.createConnection({
    host: 'localhost',
    user:"vansh1",
    password:"password",
    database:"Social_Media_App"
})