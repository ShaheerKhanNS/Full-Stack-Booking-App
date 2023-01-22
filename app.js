const sequelize = require("./database");
const express = require("express");
const bookingRouter = require("./routes/bookingsRoutes");
const Booking = require("./model/bookingModel");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res, next) => {
  const bookings = await Booking.findAll();

  res.status(200).render("base", {
    bookings,
  });
});
app.use("/api/v1/bookings", bookingRouter);

sequelize
  .sync()
  .then((res) => {
    const port = 4000;
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  })
  .catch((err) => console.log(err.message));
