const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

// GET /api/users/me - требует токен
router.get('/me', auth, async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res.json(user);
});

module.exports = router;