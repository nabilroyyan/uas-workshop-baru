const connection = require("../config/database");

class Modelfasilitas {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM fasilitas join paket on fasilitas.id_paket = paket.id_paket", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM fasilitas JOIN paket ON fasilitas.id_paket = paket.id_paket WHERE fasilitas.id_paket = ?",
        connection.query(query, [id], (err, rows) => {
        if (err) {
          reject(new Error("Failed to fetch package by ID"));
        } else {
          resolve(rows.length > 0 ? rows[0] : null);
        }
        }
      ));
    });
  }
  static async getbypaketid(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM fasilitas WHERE id_paket = ?",
        id,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows); // Ambil data pertama karena id_fasilitas adalah primary key
          }
        }
      );
    });
  }

  static async create(data) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO fasilitas SET ?", data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId); // Mengembalikan ID dari data yang baru saja dimasukkan
        }
      });
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE fasilitas SET ? WHERE id_fasilitas = ?",
        [data, id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.affectedRows); // Mengembalikan jumlah baris yang terpengaruh oleh perintah UPDATE
          }
        }
      );
    });
  }

  static async remove(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM fasilitas WHERE id_fasilitas = ?",
        id,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.affectedRows); // Mengembalikan jumlah baris yang terpengaruh oleh perintah DELETE
          }
        }
      );
    });
  }
}

module.exports = Modelfasilitas;
