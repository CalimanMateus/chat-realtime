const pool = require('../config/database');

class Message {
  static async create(userId, username, message, room = 'general') {
    const query = `
      INSERT INTO messages (user_id, room, message) 
      VALUES ($1, $2, $3) 
      RETURNING id, user_id, room, message, created_at
    `;
    const values = [userId, room, message];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getRecentMessages(room = 'general', limit = 50) {
    const query = `
      SELECT m.id, m.message, m.created_at, 
             u.username
      FROM messages m
      JOIN users u ON m.user_id = u.id
      WHERE m.room = $1
      ORDER BY m.created_at ASC
      LIMIT $2
    `;
    
    try {
      const result = await pool.query(query, [room, limit]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getMessagesByRoom(room) {
    const query = `
      SELECT m.id, m.message, m.created_at, 
             u.username
      FROM messages m
      JOIN users u ON m.user_id = u.id
      WHERE m.room = $1
      ORDER BY m.created_at ASC
    `;
    
    try {
      const result = await pool.query(query, [room]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Message;
