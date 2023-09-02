Package:
1. Mysql
2. Express
3. nodemon: untuk mempermudah restart node.js

API:
1. Get Barang = menampilkan semua barang yang ada di tabel barang;
2. Store Barang = menambahkan barang
3. Get Barang Id = menampilkan data barang (detail) berdasarkan Id yang dicari
4. Update Barang = mengubah data barang
5. Delete Barang = softdelete (didatabase tidak dihapus dan memasukan waktu data di delete tapi ketika get barang untuk data yang pernah dihapus tidak ditampilkan saja)