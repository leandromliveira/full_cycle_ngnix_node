const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

const dbConfig = {
  host: 'mysql_db',
  user: 'root',
  password: 'root_password',
  database: 'people_db',
};

async function initializeDatabase() {
  const connection = await mysql.createConnection(dbConfig);
  await connection.query(`
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `);
  connection.end();
}

app.get('/', async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  await connection.query("INSERT INTO people(name) VALUES('John Doe')");
  const [rows] = await connection.query('SELECT name FROM people');
  const names = rows.map(row => row.name);

  connection.end();

  res.send(
    `<h1>Full Cycle Rocks!</h1>`
    `<ul>${names.map(name => `<li>${name}</li>`).join('')}</ul>`
);
});

initializeDatabase().catch(err => console.error(err));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
