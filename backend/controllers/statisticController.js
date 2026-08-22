const Statistic = require('../models/Statistic');
const asyncHandler = require('../utils/asyncHandler');
const { ApiError, success } = require('../utils/apiResponse');

const getStatistics = asyncHandler(async (req, res) => {
  const statistics = await Statistic.find().sort({ order: 1, createdAt: -1 });
  return success(res, 200, statistics);
});

const createStatistic = asyncHandler(async (req, res) => {
  const statistic = await Statistic.create(req.body);
  return success(res, 201, statistic, 'Statistic created successfully');
});

const updateStatistic = asyncHandler(async (req, res) => {
  const statistic = await Statistic.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!statistic) throw new ApiError(404, 'Statistic not found');
  return success(res, 200, statistic, 'Statistic updated successfully');
});

const deleteStatistic = asyncHandler(async (req, res) => {
  const statistic = await Statistic.findByIdAndDelete(req.params.id);
  if (!statistic) throw new ApiError(404, 'Statistic not found');
  return success(res, 200, null, 'Statistic deleted successfully');
});

module.exports = { getStatistics, createStatistic, updateStatistic, deleteStatistic };
