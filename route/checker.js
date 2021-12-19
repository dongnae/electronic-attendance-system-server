const express = require("express");
const verify = require("../lib/verify");
const student = require("../lib/student");
const router = express.Router();

router.use(async (req, res, next) => {
	let {authorization} = req.headers;
	if (typeof authorization !== "string") {
		res.status(403).end(JSON.stringify({
			result: -1,
		}));
		return;
	}
	if (authorization !== require("../config").checker_token) {
		res.status(401).end(JSON.stringify({
			result: -1,
		}));
		return;
	}
	next();
});

router.get("/check", (req, res) => {
	res.end(JSON.stringify({
		result: 0,
	}));
});

router.post("/verify", async (req, res) => {
	let {jwt} = req.body;
	if (typeof jwt !== "string") {
		res.status(500).end(JSON.stringify({
			result: -1,
		}));
		return;
	}
	let num = await verify.validate(jwt);
	if (num === false) {
		res.status(500).end(JSON.stringify({
			result: -2,
		}));
		return;
	}
	let result = await student.pushAttendance(num);
	if (result < 0) res.status(500);
	res.end(JSON.stringify({
		result,
	}));
});

module.exports = router;