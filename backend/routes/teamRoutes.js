const express = require('express');
const { body } = require('express-validator');
const {
  getTeamMembers,
  getTeamMemberBySlug,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('../controllers/teamController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getTeamMembers);
router.get('/:slug', getTeamMemberBySlug);

router.post(
  '/',
  protect,
  adminOnly,
  upload.single('image'),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('designation').notEmpty().withMessage('Designation is required'),
  ],
  validate,
  createTeamMember
);

router.put('/:id', protect, adminOnly, upload.single('image'), updateTeamMember);
router.delete('/:id', protect, adminOnly, deleteTeamMember);

module.exports = router;
