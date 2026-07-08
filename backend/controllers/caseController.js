import { Case } from "../models/Case.js";

export const createCase = async (req, res, next) => {
  try {
    const { title, notes } = req.body;
    const newCase = await Case.create({
      title,
      notes,
      owner: req.user._id
    });
    res.json({ success: true, case: newCase });
  } catch (err) {
    next(err);
  }
};

export const getCases = async (req, res, next) => {
  try {
    const cases = await Case.find({ owner: req.user._id });
    res.json({ success: true, cases });
  } catch (err) {
    next(err);
  }
};

