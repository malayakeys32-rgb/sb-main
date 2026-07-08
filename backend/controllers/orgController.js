import { Org } from "../models/Org.js";

export const createOrg = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const org = await Org.create({ name, description, owner: req.user._id });
    res.json({ success: true, org });
  } catch (err) {
    next(err);
  }
};

export const getOrgs = async (req, res, next) => {
  try {
    const orgs = await Org.find({ owner: req.user._id });
    res.json({ success: true, orgs });
  } catch (err) {
    next(err);
  }
};

