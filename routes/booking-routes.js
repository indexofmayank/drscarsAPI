const Booking = require("../models/booking");
const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandler = require("../utils/errorhander");
const router = express.Router();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

router.post(
  `/`,
  catchAsyncErrors(async (req, res, next) => {
    let booking = new Booking({
      name: req.body.name,
      startDate: req.body.startDate,
      startTime: req.body.startTime,
      endDate: req.body.endDate,
      endTime: req.body.endTime,
      pricePerDay: req.body.pricePerDay,
      totalPrice: req.body.totalPrice,
      altEmail: req.body.altEmail,
      phone: req.body.phone,
    });

    booking = await booking.save();

    if (!booking) {
      return next(new Errorhandler("Something Went Wrong"));
    }

    console.log(booking.altEmail)

    const transporter = nodemailer.createTransport({
      host: "mail.rscars.in",
      port: 465,
      auth: {
        user: "official@rscars.in",
        pass: "ET(pX10HYR*o",
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"rscars 👻" <official@rscars.in>', // sender address
      to: booking.altEmail, // list of receivers
      subject: "New Booking  ✔", // Subject line
      text: JSON.stringify(booking), // plain text body
    });

    res.status(201).json({
      success: true,
      booking,
      info,
    });
  })
);

router.get(
  `/`,
  catchAsyncErrors(async (req, res, next) => {
    const bookings = await Booking.find();

    if (!bookings) {
      return next(new Errorhandler("No Bookings found at this moment"));
    }

    res.status(201).json({
      success: true,
      bookings,
    });
  })
);

router.get(
  `/test`,
  catchAsyncErrors(async (req, res, next) => {
    res.send("Working from Booking-routes");
  })
);

module.exports = router;
