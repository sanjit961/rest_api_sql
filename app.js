const express = require("express");
const bodyParser = require("body-parser");
const mySql = require("mysql");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const PORT = 5000;
const sqlConnection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb",
});
sqlConnection.connect(function (err) {
  if (err) throw err;
  console.log("SQL DATABASE connected!");
});

app.get("/getUsers", (req, res) => {
  sqlConnection.query("SELECT * FROM customers", (error, results, fields) => {
    if (error) throw error;
    res.send({
      error: false,
      message: "The data fetched successfully!",
      dataCount: results.length,
      results: results,
    });
  });
});

app.get("/getById/:id", (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(400).send({ error: true, message: "Please provide id" });
  }
  sqlConnection.query(
    "SELECT * FROM customers where id=?",
    id,
    (error, results, fields) => {
      if (error) throw error;
      res.send({
        message: "The data fetched successfully!",
        error: false,
        results: results[0],
      });
    }
  );
});

app.post("/post", (req, res) => {
  let name = req.query.name;
  let address = req.query.address;
  let user = {
    name: name,
    address: address,
  };
  if (!user) {
    res.status(400).send({ error: true, message: "Please provide user" });
  }
  sqlConnection.query(
    "INSERT INTO customers SET ? ",
    user,
    (error, results, fields) => {
      if (error) throw error;
      res.send({
        message: "New user has been created successfully.",
        results: results,
      });
    }
  );
});
app.delete("/delete/:id", function (req, res) {
  let user_id = req.params.id;
  if (!user_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user_id" });
  }
  sqlConnection.query(
    "DELETE FROM customers WHERE id = ?",
    [user_id],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({ message: "User has been deleted successfully." });
    }
  );
});

//  Update user with id
app.put("/update", function (req, res) {
  let user_id = parseInt(req.body.id);
  let name = req.body.name;
  let address = req.body.address;
  console.log("userid",user_id);
  let user = {
    name: name,
    address: address,
  };
  if (!user_id) {
    return res
      .status(400)
      .send({ error: user, message: "Please provide user and user_id" });
  }
  sqlConnection.query(
    "UPDATE customers SET ? WHERE id=?",
    [user, user_id],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "user has been updated successfully.",
      });
    }
  );
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
const SWAGGER_DOC = `http://localhost:${PORT}/api-docs`;
app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
  console.log(`API DOCUMENTATIONS: ${SWAGGER_DOC}`);
});
