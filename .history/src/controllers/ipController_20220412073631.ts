// @ts-nocheck

import axios from "axios";
import fs from "fs";
import data from "../../data.json";
import Ip from "../models/Ip";

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

    data.ips = ips;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send("write error!");
    });

    dataToPostgres.ips.forEach((ip) => {
      Ip.getAllIps(ip);
    });

    res.status(201).send(data);
  },

  remove(req, res) {
    let listIps = [];

    const { ip } = req.body;

    Ip.delete(ip);

    listIps = data.ips.filter((e) => ip.includes(e) !== true);

    data.ips = listIps;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send("write error!");
    });

    res.status(200).send(data);
  },

  getAllIpsUpdated(req, res) {
    res.status(200).send(data.ips);
  },
};
