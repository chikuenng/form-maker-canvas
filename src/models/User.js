const { pool } = require('../config/connection');

class User {
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(userData) {
    const { name, email } = userData;
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    return { id: result.insertId, name, email };
  }
}

module.exports = User;
