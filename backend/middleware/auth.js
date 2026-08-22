const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const { ApiError } = require('../utils/apiResponse');
const Admin = require('../models/Admin');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized, no token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      throw new ApiError(401, 'Not authorized, admin not found');
    }
    req.admin = admin;
    next();
  } catch (error) {
    throw new ApiError(401, 'Not authorized, token invalid or expired');
  }
});

const adminOnly = (req, res, next) => {
  if (!req.admin) {
    throw new ApiError(403, 'Admin access required');
  }
  next();
};

module.exports = { protect, adminOnly };
