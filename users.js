var express = require("express");
var router = express.Router();

const users = [
  {
    id: 1,
    username: "amujkic",
  },
  {
    id: 2,
    username: "jsmith",
  },
];

router.get("/", function (req, res) {
  res.json(users);
});

module.exports = router;
