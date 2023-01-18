var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kas@123456",
  database: "mydb",
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE mydb", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });

// var sql = "CREATE TABLE info (empId INT PRIMARY KEY, salary VARCHAR(255), adharNo INT, FOREIGN KEY (empId) REFERENCES employee(id))";

// var sql = "CREATE TABLE employee (id INT PRIMARY KEY, name VARCHAR(255), mobile INT)";

// var sql =
//   "CREATE TABLE student (id INT PRIMARY KEY,first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, city_id INT FOREIGN KEY REFERENCES city(id))";
// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Table created");
// });

// var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";

// var sql = "CREATE TABLE emp (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";

// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Table created");
// });

// var sql = "INSERT INTO info (empId, salary, adharNo) VALUES (23, 'dfsfsf', 234242)";
// // var sql = "INSERT INTO employee (id, name, mobile) VALUES (23, 'sanjit', 887766)";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });


var sql = "ALTER TABLE employee ADD FOREIGN KEY (id) REFERENCES info(empId)";

con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
con.query("SELECT * FROM info", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
con.query("SELECT * FROM employee", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

// });
