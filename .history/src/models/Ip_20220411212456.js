const db = require("../config/db");

module.exports = {
  async getAllIps(data, callback) {
    const query = `
    INSERT INTO ips (
        ip
    ) VALUES ($1)
    RETURNING id`;

    const values = [data[0]];

    db.query(query, values, function (err, results) {
      if (err) console.log(`Database error ${err}`);
      callback(results.rows[0]);
    });
  },
};
