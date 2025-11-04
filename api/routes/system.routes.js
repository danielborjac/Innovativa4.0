const express = require('express');
const router = express.Router();

/**
 * Simple endpoint to keep the server awake.
 * Returns a 200 OK response with "pong" and current server time.
 */
router.get('/ping', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'pong',
    time: new Date().toISOString()
  });
});

module.exports = router;