const { generateError } = require("../lib");
const {
  findAllReports,
  findAllReportsById,
  findOneReport,
  createReport,
  updateReport,
  removeReport,
} = require("../repositories/reportsRepository");
const {
  REPORT_NOT_FOUND,
  REPORT_NOT_FOUND_BY_ID,
  REPORT_NOT_CREATED,
  REPORT_NOT_UPDATED,
  REPORT_NOT_DELETED,
  REPORT_CREATED,
  REPORT_UPDATED,
  REPORT_DELETED,
  REPORT_NOT_ALLOWED,
} = require("../messages/messages.json");
const { reportValidation } = require("../validations");
const { findBookingDates } = require("../repositories/bookingsRepository");

const findAll = async (req, res, next) => {
  try {
    const data = await findAllReports();

    if (data.length === 0) {
      generateError(REPORT_NOT_FOUND, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const findAllById = async (req, res, next) => {
  try {
    const data = await findAllReportsById(req.auth.id);

    if (data.length === 0) {
      generateError(REPORT_NOT_FOUND, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const data = await findOneReport(req.params.id, req.auth.id);

    if (!data) {
      generateError(REPORT_NOT_FOUND_BY_ID, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const value = await reportValidation(req.body);

    const date = await findBookingDates(value.space_id, req.auth.id);

    if (!date || new Date(date.start_date).getTime() > Date.now()) {
      generateError(REPORT_NOT_ALLOWED, 500);
    }

    const insertId = await createReport(value, req.auth.id);

    if (!insertId) {
      generateError(REPORT_NOT_CREATED, 500);
    }

    res.json({ data: { message: REPORT_CREATED, data: value } });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const value = await reportValidation(req.body);

    const affectedRows = await updateReport(value, req.params.id, req.auth.id);

    if (affectedRows === 0) {
      generateError(REPORT_NOT_UPDATED, 500);
    }

    res.json({ message: REPORT_UPDATED });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const affectedRows = await removeReport(req.params.id, req.auth.id);

    if (affectedRows === 0) {
      generateError(REPORT_NOT_DELETED, 500);
    }

    res.json({ message: REPORT_DELETED });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findAllById,
  findOne,
  create,
  update,
  remove,
};
