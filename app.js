const sequelize = require("./database");
const express = require("express");
const bookingRouter = require("./routes/bookingsRoutes");
const Booking = require("./model/bookingModel");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

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
