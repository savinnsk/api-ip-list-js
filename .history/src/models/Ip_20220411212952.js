const db = require("../config/db");

module.exports = {
  getAllIps(data) {
    const query = `
    INSERT INTO ips (
        ip
    ) VALUES ($1)
    RETURNING id`;

    const values = [data];

    db.query(query, values, function (err) {
      if (err) console.log(`Database error ${err}`);
    });
  },
};
