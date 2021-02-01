const connection = require('../database/connection.js');

module.exports = { 
  
  async get(id) {
    const repos = await connection('repos')
      .where('id', id)
      .select('*');

      return repos.length > 0 ? repos[0] : null;
  },
  
  async saveAll(repositories) {
    repositories.forEach(repository => this.save(repository));
  },

  async save(repository) {
    const [success] = await connection('repos')
      .insert(repository)
      .onDuplicateUpdate('name','full_name', 'stars', 'description', 'language');
  }
 }