const express = require('express');
const router  = express.Router();
const { chat } = require('../controllers/chatController');

// POST /api/chat  →  { mensaje } → { ok, respuesta }
router.post('/', chat);

module.exports = router;
