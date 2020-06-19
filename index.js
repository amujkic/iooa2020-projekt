var express = require("express");
var router = express.Router();

router.use("/users", require("./users"));
router.use("/orders", require("./orders"));

router.use("/", function (req, res) {
  res.send("Narudzba namjestaja online API v1.0");
});

module.exports = router;
