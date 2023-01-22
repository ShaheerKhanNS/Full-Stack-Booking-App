const e = require("express");
const Booking = require("../model/bookingModel");

exports.getAllBookings = (req, res) => {
  Booking.findAll()
    .then((bookings) => {
      console.log(bookings);
      res.send(`Sending all users`);
    })
    .catch((err) => console.log(err.message));
};

exports.getBooking = (req, res) => {
  const id = req.params.id;
  Booking.findByPk(id)
    .then((booking) => {
      res.status(200).json({
        status: "sucess",
        data: booking,
      });
    })
    .catch((err) => console.log(err.message));
};

exports.createBooking = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  Booking.create({
    name,
    email,
  })
    .then((result) => res.send(`creating booking`))
    .catch((err) => console.log(err.message));
};

exports.updateBooking = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const id = req.params.id;
    const booking = await Booking.findByPk(id);
    booking.name = name;
    booking.email = email;
    const newData = await booking.save();
    res.status(200).json({
      status: "Sucees",
      data: {
        newData,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.deleteBooking = (req, res) => {
  const id = req.params.id;
  Booking.findByPk(id)
    .then((booking) => {
      return booking.destroy();
    })
    .then(() => {
      res.send("Deleted");
      console.log(`Deleted`);
    })
    .catch((err) => console.log(err.message));
};
