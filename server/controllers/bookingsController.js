const { STRIPE_API_SECRET } = process.env;
const stripe = require("stripe")(STRIPE_API_SECRET);
const { generateError } = require("../lib");
const {
  findAllBookingsById,
  findOneBooking,
  createBooking,
  removeBooking,
  validateBooking,
} = require("../repositories/bookingsRepository");
const {
  BOOKING_NOT_FOUND,
  BOOKING_NOT_FOUND_BY_ID,
  BOOKING_NOT_CREATED,
  BOOKING_NOT_DELETED,
  BOOKING_CREATED,
  BOOKING_DELETED,
  BOOKING_DATE_NOT_AVAILABLE,
} = require("../messages/messages.json");
const { bookingValidation } = require("../validations");
const sendMail = require("../lib/sendMail");

const findAllById = async (req, res, next) => {
  try {
    const data = await findAllBookingsById(req.auth.id);

    if (data.length === 0) {
      generateError(BOOKING_NOT_FOUND, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const data = await findOneBooking(req.params.id, req.auth.id);

    if (!data) {
      generateError(BOOKING_NOT_FOUND_BY_ID, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const value = await bookingValidation(req.body);

    const insertId = await createBooking(value, req.auth.id);

    if (!insertId) {
      generateError(BOOKING_NOT_CREATED, 500);
    }

    const data = await findOneBooking(insertId, req.auth.id);

    await sendMail(BOOKING_CREATED, templateContent(data), "booking");

    res.json({ data: { status: "ok", message: BOOKING_CREATED } });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const affectedRows = await removeBooking(req.params.id, req.auth.id);

    if (!affectedRows) {
      generateError(BOOKING_NOT_DELETED, 500);
    }

    res.json({ message: BOOKING_DELETED });
  } catch (error) {
    next(error);
  }
};

const payment = async (req, res, next) => {
  try {
    const value = await bookingValidation(req.body);

    const result = await validateBooking(value);

    if (result) {
      generateError(BOOKING_DATE_NOT_AVAILABLE, 400);
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: value.amount,
      currency: "eur",
      payment_method_types: ["card"],
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
};

const templateContent = (data) => ({
  fullName: data.first_name + " " + data.last_name,
  email: data.email,
  spaceName: data.name,
  spaceAddress: data.address,
  price: data.price,
  startDate: new Date(data.start_date).toLocaleString(),
  endDate: new Date(data.end_date).toLocaleString(),
});

module.exports = {
  findAllById,
  findOne,
  create,
  remove,
  payment,
};
