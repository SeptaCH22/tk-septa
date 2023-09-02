const express = require("express");
const app = express();
const conn = require("./config/db");

app.use(express.json());

app.get("/get-barang", function (req, res) {
  const queryStr = "SELECT * FROM barang WHERE deleted_at IS NULL";
  conn.query(queryStr, (err, results) => {
    if (err) {
      res.error(err.sqlMessage, res);
    } else {
      res.status(200).json({
        success: true,
        message: "Sukses menampilkan data barang",
        data: results,
      });
    }
  });
});

app.post("/store-barang", function (req, res) {
  const param = req.body;
  const name = param.name;
  const stock = param.stock;
  const now = new Date();

  const queryStr =
    "INSERT INTO barang (name, stock, created_at) VALUES (?, ?, ?)";
  const values = [name, stock, now];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        // message: err.sqlMessage,
        message: "Barang Gagal disimpan",
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Sukses menyimpan data barang",
        data: results,
      });
    }
  });
});

app.listen(3000);
