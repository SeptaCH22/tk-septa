const express = require("express");
const app = express();
const conn = require("./config/db");

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

app.listen(3000);
