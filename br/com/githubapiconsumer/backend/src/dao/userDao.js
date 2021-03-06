const connection = require('../database/connection.js');

module.exports = { 
  
  async get(id) {
    const users = await connection('users')
      .where('id', id)
      .select('*');

    return users.length > 0 ? users[0] : null;
  },
  
  async saveOrUpdate(user) {
    const [success] = await connection('users')
      .insert(user)
      .onDuplicateUpdate('login', 'avatar_url', 'url');

    return success;
  }

 }