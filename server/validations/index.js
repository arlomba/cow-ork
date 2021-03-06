const Joi = require("joi");
const messages = require("../messages/messages.json");

const bookingValidation = async (body) => {
  const schema = Joi.object({
    space_id: Joi.number().min(1).required().messages({
      "number.empty": messages.SPACE_ID_REQUIRED,
      "any.required": messages.SPACE_ID_REQUIRED,
      "number.min": messages.SPACE_ID_MIN_LENGTH,
    }),
    start_date: Joi.date().iso().required().greater("now").messages({
      "date.empty": messages.BOOKING_START_DATE_REQUIRED,
      "date.format": messages.BOOKING_DATE_FORMAT,
      "date.greater": messages.BOOKING_START_DATE_GREATER,
      "any.required": messages.BOOKING_START_DATE_REQUIRED,
    }),
    end_date: Joi.date()
      .iso()
      .greater(Joi.ref("start_date"))
      .required()
      .messages({
        "date.empty": messages.BOOKING_END_DATE_REQUIRED,
        "date.format": messages.BOOKING_DATE_FORMAT,
        "date.greater": messages.BOOKING_END_DATE_GREATER,
        "any.required": messages.BOOKING_END_DATE_REQUIRED,
      }),
    amount: Joi.number(),
  });

  return await schema.validateAsync(body);
};

const reportCategoryValidation = async (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.empty": messages.REPORT_CATEGORY_NAME_REQUIRED,
      "any.required": messages.REPORT_CATEGORY_NAME_REQUIRED,
      "string.min": messages.REPORT_CATEGORY_NAME_MIN_LENGTH,
      "string.max": messages.REPORT_CATEGORY_NAME_MAX_LENGTH,
    }),
  });

  return await schema.validateAsync(body);
};

const reportValidation = async (body) => {
  const schema = Joi.object({
    space_id: Joi.number().min(1).required().messages({
      "number.empty": messages.SPACE_ID_REQUIRED,
      "any.required": messages.SPACE_ID_REQUIRED,
      "number.min": messages.SPACE_ID_MIN_LENGTH,
    }),
    category_id: Joi.number().min(1).required().messages({
      "number.base": messages.CATEGORY_ID_REQUIRED,
      "number.empty": messages.CATEGORY_ID_REQUIRED,
      "any.required": messages.CATEGORY_ID_REQUIRED,
      "number.min": messages.CATEGORY_ID_MIN_LENGTH,
    }),
    description: Joi.string().min(3).max(250).required().messages({
      "string.empty": messages.REPORT_DESCRIPTION_REQUIRED,
      "any.required": messages.REPORT_DESCRIPTION_REQUIRED,
      "string.min": messages.REPORT_DESCRIPTION_MIN_LENGTH,
      "string.max": messages.REPORT_DESCRIPTION_MAX_LENGTH,
    }),
    status: Joi.string().valid("PENDING", "OPEN", "CLOSED").messages({
      "any.only": messages.REPORT_STATUS_VALID,
    }),
  });

  return await schema.validateAsync(body);
};

const serviceValidation = async (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.empty": messages.SERVICE_NAME_REQUIRED,
      "any.required": messages.SERVICE_NAME_REQUIRED,
      "string.min": messages.SERVICE_NAME_MIN_LENGTH,
      "string.max": messages.SERVICE_NAME_MAX_LENGTH,
    }),
  });

  return await schema.validateAsync(body);
};

const spaceValidation = async (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.empty": messages.SPACE_NAME_REQUIRED,
      "string.min": messages.SPACE_NAME_MIN_LENGTH,
      "string.max": messages.SPACE_NAME_MAX_LENGTH,
    }),
    description: Joi.string().min(3).max(250).required().messages({
      "string.empty": messages.SPACE_DESCRIPTION_REQUIRED,
      "string.min": messages.SPACE_DESCRIPTION_MIN_LENGTH,
      "string.max": messages.SPACE_DESCRIPTION_MAX_LENGTH,
    }),
    address: Joi.string().min(3).max(250).required().messages({
      "string.empty": messages.SPACE_ADDRESS_REQUIRED,
      "string.min": messages.SPACE_ADDRESS_MIN_LENGTH,
      "string.max": messages.SPACE_ADDRESS_MAX_LENGTH,
    }),
    price: Joi.number().min(1).max(1000).required().messages({
      "number.base": messages.SPACE_PRICE_REQUIRED,
      "number.empty": messages.SPACE_PRICE_REQUIRED,
      "number.min": messages.SPACE_PRICE_MIN_LENGTH,
      "number.max": messages.SPACE_PRICE_MAX_LENGTH,
    }),
    capacity: Joi.number().min(1).required().messages({
      "number.base": messages.SPACE_CAPACITY_REQUIRED,
      "number.empty": messages.SPACE_CAPACITY_REQUIRED,
      "number.min": messages.SPACE_CAPACITY_MIN_LENGTH,
    }),
    type_id: Joi.number().min(1).required().messages({
      "number.base": messages.TYPE_ID_REQUIRED,
      "number.empty": messages.TYPE_ID_REQUIRED,
      "number.required": messages.TYPE_ID_REQUIRED,
      "number.min": messages.TYPE_ID_MIN_LENGTH,
    }),
    services: Joi.array().items(Joi.number()).min(1).messages({
      "array.base": messages.SPACE_SERVICES_REQUIRED,
      "array.empty": messages.SPACE_SERVICES_REQUIRED,
      "array.min": messages.SPACE_SERVICES_MIN_LENGTH,
    }),
    image: Joi.any(),
    is_clean: Joi.number().valid(0, 1).required(),
  });

  return await schema.validateAsync(body);
};

const spaceTypeValidation = async (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.empty": messages.SPACE_TYPE_NAME_REQUIRED,
      "any.required": messages.SPACE_TYPE_NAME_REQUIRED,
      "string.min": messages.SPACE_TYPE_NAME_MIN_LENGTH,
      "string.max": messages.SPACE_TYPE_NAME_MAX_LENGTH,
    }),
  });

  return await schema.validateAsync(body);
};

const userValidation = async (body) => {
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(100).required().messages({
      "string.empty": messages.FIRST_NAME_REQUIRED,
      "any.required": messages.FIRST_NAME_REQUIRED,
      "string.min": messages.FIRST_NAME_MIN_LENGTH,
      "string.max": messages.FIRST_NAME_MAX_LENGTH,
    }),
    last_name: Joi.string().min(3).max(100).required().messages({
      "string.empty": messages.LAST_NAME_REQUIRED,
      "any.required": messages.LAST_NAME_REQUIRED,
      "string.min": messages.LAST_NAME_MIN_LENGTH,
      "string.max": messages.LAST_NAME_MAX_LENGTH,
    }),
    bio: Joi.string().min(3).max(250).required().messages({
      "string.empty": messages.USER_BIO_REQUIRED,
      "any.required": messages.USER_BIO_REQUIRED,
      "string.min": messages.USER_BIO_MIN_LENGTH,
      "string.max": messages.USER_BIO_MAX_LENGTH,
    }),
    email: Joi.string().min(3).max(100).email().required().messages({
      "string.empty": messages.EMAIL_REQUIRED,
      "any.required": messages.EMAIL_REQUIRED,
      "string.min": messages.EMAIL_MIN_LENGTH,
      "string.max": messages.EMAIL_MAX_LENGTH,
      "string.email": messages.EMAIL_VALID,
    }),
    password: Joi.string().min(6).max(36).required().messages({
      "string.empty": messages.PASSWORD_REQUIRED,
      "any.required": messages.PASSWORD_REQUIRED,
      "string.min": messages.PASSWORD_MIN_LENGTH,
      "string.max": messages.PASSWORD_MAX_LENGTH,
    }),
    password_confirmation: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.required": messages.PASSWORD_CONFIRMATION_REQUIRED,
        "any.only": messages.PASSWORD_CONFIRMATION_VALID,
      }),
    avatar: Joi.any(),
  });

  return await schema.validateAsync(body);
};

const loginValidation = async (body) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(100).email().required().messages({
      "string.empty": messages.EMAIL_REQUIRED,
      "any.required": messages.EMAIL_REQUIRED,
      "string.min": messages.EMAIL_MIN_LENGTH,
      "string.max": messages.EMAIL_MAX_LENGTH,
      "string.email": messages.EMAIL_VALID,
    }),
    password: Joi.string().min(6).max(36).required().messages({
      "string.empty": messages.PASSWORD_REQUIRED,
      "any.required": messages.PASSWORD_REQUIRED,
      "string.min": messages.PASSWORD_MIN_LENGTH,
      "string.max": messages.PASSWORD_MAX_LENGTH,
    }),
  });

  return await schema.validateAsync(body);
};

const spaceRatingValidation = async (body) => {
  const schema = Joi.object({
    space_id: Joi.number().required().messages({
      "number.base": messages.SPACE_ID_REQUIRED,
      "number.required": messages.SPACE_ID_REQUIRED,
    }),
    rating: Joi.number().min(1).max(5).required().messages({
      "number.base": messages.RATING_REQUIRED,
      "number.required": messages.RATING_REQUIRED,
      "number.min": messages.RATING_MIN_LENGTH,
      "number.max": messages.RATING_MAX_LENGTH,
    }),
  });

  return await schema.validateAsync(body);
};

const registerValidation = async (body) => {
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(100).required().messages({
      "string.empty": messages.FIRST_NAME_REQUIRED,
      "any.required": messages.FIRST_NAME_REQUIRED,
      "string.min": messages.FIRST_NAME_MIN_LENGTH,
      "string.max": messages.FIRST_NAME_MAX_LENGTH,
    }),
    last_name: Joi.string().min(3).max(100).required().messages({
      "string.empty": messages.LAST_NAME_REQUIRED,
      "any.required": messages.LAST_NAME_REQUIRED,
      "string.min": messages.LAST_NAME_MIN_LENGTH,
      "string.max": messages.LAST_NAME_MAX_LENGTH,
    }),
    email: Joi.string().min(3).max(100).email().required().messages({
      "string.empty": messages.EMAIL_REQUIRED,
      "any.required": messages.EMAIL_REQUIRED,
      "string.min": messages.EMAIL_MIN_LENGTH,
      "string.max": messages.EMAIL_MAX_LENGTH,
      "string.email": messages.EMAIL_VALID,
    }),
    password: Joi.string().min(6).max(36).required().messages({
      "string.empty": messages.PASSWORD_REQUIRED,
      "any.required": messages.PASSWORD_REQUIRED,
      "string.min": messages.PASSWORD_MIN_LENGTH,
      "string.max": messages.PASSWORD_MAX_LENGTH,
    }),
    password_confirmation: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.required": messages.PASSWORD_CONFIRMATION_REQUIRED,
        "any.only": messages.PASSWORD_CONFIRMATION_VALID,
      }),
  });

  return await schema.validateAsync(body);
};

module.exports = {
  bookingValidation,
  reportCategoryValidation,
  reportValidation,
  serviceValidation,
  spaceRatingValidation,
  spaceValidation,
  spaceTypeValidation,
  userValidation,
  loginValidation,
  registerValidation,
};
