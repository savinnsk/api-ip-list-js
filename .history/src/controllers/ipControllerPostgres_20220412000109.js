const axios = require("axios");
const Ip = require("../models/Ip");

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
    const dataToPostgres = { ips: [] };

    dataToPostgres.ips = ips;

    dataToPostgres.ips.forEach((ip) => {
      Ip.getAllIps(ip);
    });

    res.status(201).send(data);
  },

  remove(req, res) {
    const { ip } = req.body;
    Ip.delete(ip);
    res.status(200).send(data);
  },

  getAllIpsUpdated(req, res) {
    Ip.getAllUpdated((data) => {
      res.status(200).send(data);
    });
  },
};
