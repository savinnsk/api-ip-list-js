const axios = require("axios");
const fs = require("fs");
const data = require("../../data.json");

module.exports = {
  async getAllIps(req, res) {
    async function fetchIps() {
      let ipsArray = [];

      const fetch = await axios.get(
        "https://onionoo.torproject.org/summary?limit=5000"
      );
      const all = await fetch.data.relays;
      all.map((ip) => ipsArray.push(ip.a[0]));
      return ipsArray;
    }

    const ips = await fetchIps();

    data.ips = ips;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send("write error!");
    });

    res.status(201).send(data);
  },

  remove(req, res) {
    let listIps = [];

    const { ip } = req.body;

    listIps = data.ips.filter((e) => ip.includes(e) !== true);

    data.ips = listIps;

    res.status(200).send(data);
  },
};
