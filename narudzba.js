var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");

router.get("/narudzba", function (req, res) {
  res.render("Home/narudzba");
});
router.get("/narudzba/popis", function (req, res) {
  let orders = [];
  fetch("http://localhost:3000/api/orders")
    .then((response) => response.json())
    .then((data) => {
      orders = data.data;
      res.render("Home/narudzba/popis", { orders });
    });
});

module.exports = router;
