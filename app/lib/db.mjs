import mysql from 'mysql2/promise';

export default class DB {
  #db;

  async getProducts({limit=10, offset=0} = {}) {
    const db = await this.#getDb();
    const [rows] = await this.#db.execute(
        'SELECT `id`, `description` FROM `products`  ORDER BY `id` LIMIT ' 
            + db.escape(limit) 
            + ' OFFSET ' 
            + db.escape(offset)
    );

    return rows;
  }

  async getProductsCount() {
    const db = await this.#getDb();
    const [[{count}]] = await this.#db.execute(
      'SELECT COUNT(*) as count FROM `products`'
    );

    return count;
  }

  async #getDb() {
    if (!this.#db) {
      this.#db = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'demo1234',
        database: 'mydb',
        port: '3307'
      });
    }

    return this.#db;
  }
}