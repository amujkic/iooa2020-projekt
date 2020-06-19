var express = require("express");
var mongoose = require("mongoose"); //pristup bazi podataka
var router = express.Router();
var params = require("../../params/params.js");

mongoose.connect(params.DATABASECONNECTION, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

const Order = db.model("Order", {
  productName: String,
  quantity: String,
  nameAndSurname: String,
  address: String,
  height: String,
  telephoneNumber: String,
  width: String,
  depth: String,
  contactInfo: String,
  orderStatus: String,
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  router.get("/", function (req, res) {
    Order.find().then((data) => {
      res.status(200).send({
        status: "success",
        data,
      });
    });
  });

  router.post("/confirm/:id", function (req, res) {
    const docId = req.params.id;
    Order.findByIdAndUpdate(docId, { orderStatus: "Potvrđeno" })
      .then((data) => {
        return res.status(200).send({
          status: "success",
          text: "Narudžba potvrđena",
          data,
        });
      })
      .catch((error) => {
        console.error("Greška pri potvrdi statusa narudžbe!", error);
        return res.status(500).send({
          status: "error",
          error,
        });
      });
  });

  router.post("/", function (req, res) {
    // koristenje username i passworda za spajanje na bazu podataka

    const order = new Order({ ...req.body, orderStatus: "Zaprimljeno" });

    order
      .save()
      .then((data) => {
        console.log("Nova narudzba spremljena:", data);
        const response = {
          status: "success",
          data,
        };
        res.redirect("/narudzba/popis");
      })
      .catch((err) => {
        console.log(`Greska pri spremanju narudzbe ${order.productName}`);
        res.json({
          status: "error",
          err,
        });
      });
  });
});

module.exports = router;
