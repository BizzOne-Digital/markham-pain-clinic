const express = require('express');
const { getDashboardOverview } = require('../controllers/dashboardController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, adminOnly, getDashboardOverview);

module.exports = router;
