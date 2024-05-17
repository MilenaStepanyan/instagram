import mysql2 from "mysql2/promise"

const pool = mysql2.createPool({
    host:'localhost',
    user:'root',
    password:'milena.777',
    database:'social_media',
})

export default pool