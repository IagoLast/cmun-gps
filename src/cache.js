const express = require('express');
const router = express.Router();
const cache = require('memory-cache');
const fetch = require('node-fetch');


router.get('/search', cacheMiddleware);

function cacheMiddleware(req, res, next) {
	let cached = cache.get(req.originalUrl);
	if (cached) {
		console.log('cached');
		return res.json(cached);
	} else {
		next();
	}
}

module.exports = router;
