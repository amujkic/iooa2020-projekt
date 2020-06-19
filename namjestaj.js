var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../../modeli/user");

router.get("/namjestaj", function (req, res) {
  res.render("Home/namjestaj");
});
router.get("/namjestaj/stolice", function (req, res) {
  res.render("Home/namjestaj/stolice");
});
router.get("/namjestaj/stolovi", function (req, res) {
  res.render("Home/namjestaj/stolovi");
});
router.get("/namjestaj/ormari", function (req, res) {
  res.render("Home/namjestaj/kabineti");
});

module.exports = router;
