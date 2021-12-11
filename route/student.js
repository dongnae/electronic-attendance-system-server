const student = require("../lib/student");
const verify = require("../lib/verify");
const express = require("express");
const router = express.Router();

router.use(async (req, res, next) => {
	let {num, name} = req.body;
	if (typeof num !== "string" || typeof name !== "string") {
		res.status(500).end(JSON.stringify({
			result: -1,
		}));
		return;
	}
	if (!(await student.existsStudent(num, name))) {
		res.status(401).end(JSON.stringify({
			result: 1,
		}));
		return;
	}
	next();
});

router.post("/check/", (req, res) => {
	res.end(JSON.stringify({
		result: 0,
	}));
});

router.post("/qr/", async (req, res) => {
	let {num} = req.body;
	let jwt = await verify.generate(num);
	if (jwt === false) {
		res.status(500).end(JSON.stringify({
			result: -2,
		}));
		return;
	}
	res.end(JSON.stringify({
		result: 0,
		result_data: jwt,
	}));
});

router.post("/log/", async (req, res) => {
	let {num} = req.body;
	let log = await student.getAttendanceLog(num);
	if (log === false) {
		res.status(500).end(JSON.stringify({
			result: -3,
		}));
		return;
	}
	res.end(JSON.stringify({
		result: 0,
		result_data: log,
	}));
});

module.exports = router;