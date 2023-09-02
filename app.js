const express = require("express");
const app = express();
const conn = require("./config/db");

app.use(express.json());

// 1. Menampilkan semua data barang yang ada
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

// 2. Add Data Barang
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

// 3. Get Barang by ID
app.get("/get-barang-by-id", function (req, res) {
  const param = req.query;
  const id = param.id;
  const queryStr = "SELECT * FROM barang WHERE id = ? AND deleted_at IS NULL";
  const values = [id];
  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Gagal mencari barang berdasarkan Id",
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Sukses mencari barang berdasarkan Id",
        data: results,
      });
    }
  });
});

// 4. Update Barang
app.post("/update-barang", function (req, res) {
  const param = req.body;
  const id = param.id;
  const name = param.name;
  const stock = param.stock;
  const queryStr =
    "UPDATE barang SET name = ?, stock = ? WHERE id = ? AND deleted_at IS NULL";
  const values = [name, stock, id];
  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Gagal mengubah barang",
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Sukses mengubah data barang",
        data: results,
      });
    }
  });
});

// 5. Softdelete Data Barang
app.post("/delete-barang", function (req, res) {
  const param = req.body;
  const id = param.id;
  const queryStr = "UPDATE barang SET deleted_at = ? WHERE id = ?";
  const now = new Date();
  const values = [now, id];
  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Gagal menghapus barang",
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Sukses menghapus data barang",
        data: results,
      });
    }
  });
});

app.listen(3000);
