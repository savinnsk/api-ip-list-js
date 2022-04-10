const { Router } = require("express");
const ipController = require("../controllers/ipController");

const router = Router();

router.get("/", ipController.getAllIps);

router.post("/remove/", ipController.remove);

router.get("/ips", ipController.getAllIpsUpdated);

module.exports = { router };
