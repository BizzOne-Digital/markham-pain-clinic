const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const asyncHandler = require('../utils/asyncHandler');
const { ApiError, success } = require('../utils/apiResponse');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');
  if (!admin || !(await admin.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(admin._id);
  return success(res, 200, {
    token,
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
  }, 'Login successful');
});

const register = asyncHandler(async (req, res) => {
  if (process.env.ALLOW_ADMIN_REGISTER !== 'true') {
    throw new ApiError(403, 'Admin registration is disabled');
  }

  const { name, email, password } = req.body;
  const existing = await Admin.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new ApiError(409, 'Admin with this email already exists');
  }

  const admin = await Admin.create({ name, email, password });
  const token = generateToken(admin._id);
  return success(res, 201, {
    token,
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
  }, 'Admin registered successfully');
});

const getMe = asyncHandler(async (req, res) => {
  return success(res, 200, req.admin, 'Current admin fetched');
});

module.exports = { login, register, getMe };
