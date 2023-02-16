const Role = require('../models/Role');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const getAllRoles = async (req, res) => {
  const roles = await Role.find().sort('-created_at');
  if ((!roles) || (roles.length < 1)) return res.status(404).json({ "message": "No roles found" });
  res.json(roles);
};


const getRole = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate role ID required" });

  const role = await Role.findOne({ _id: req.params.id }).exec();
  if (!role) {
    return res.status(404).json({ "message": `No role matches the role ID ${req.params.id}` });
  }
  res.json(role);
};


const createRole = [
  body('name')
      .trim()
      .isLength({ min: 3, max: 45 })
      .withMessage('Role name must be exactly between 3-45 characters long')
      .escape(),
  body('code')
      .trim()
      .isLength({ min: 3, max: 45 })
      .withMessage('Role code must be exactly between 3-45 characters long')
      .escape()
  ,
  async (req, res) => {
    if (req.body?.name) req.body.name;
    if (req.body?.code) req.body.code;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const duplicateRole = await Role.findOne({ code: req.body.code }).exec();
    if (duplicateRole) {
      return res.status(409).json({ "message": `Role ${duplicateRole} already exists` });
    };

    const role = await new Role({
      name: req.body.name,
      code: req.body.code
    });

    role.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).json(role);
    });
  }
];


const updateRole = [
  body('name')
      .trim()
      .isLength({ min: 3, max: 45 })
      .withMessage('Role name must be exactly between 3-45 characters long')
      .escape(),
  body('code')
      .trim()
      .isLength({ min: 3, max: 45 })
      .withMessage('Role code must be exactly between 3-45 characters long')
      .escape()
  ,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const role = await Role.findOne({ _id: req.params.id }).exec();
    if (!role) {
      return res.status(404).json({ "message": `The specified role ${req.body.role} does not match our records` });
    };
    if (req.body?.name) role.name = req.body.name;
    if (req.body?.code) role.code = req.body.code;

    const result = await role.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  }
];


const deleteRole = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate role required" });

  const role = await Role.findOne({ _id: req.params.id }).exec();
  if (!role) {
    return res.status(404).json({ "message": `No role matches ${req.params.id}` });
  };
  const result = await role.deleteOne();
  res.json(result);
};




module.exports = {
 getAllRoles,
 getRole,
 createRole,
 updateRole,
 deleteRole
};