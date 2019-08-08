const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('testdb', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to database.');
});
db.serialize(function() {
  // db.run('DROP TABLE users')
  db.run('CREATE TABLE users ( id INTEGER PRIMARY KEY AUTOINCREMENT, name text NOT NULL, pass next NOT NULL);');
});
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection');
});
