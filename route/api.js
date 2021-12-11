const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
	res.header("Content-Type", "application/json; charset=utf-8");
	next();
});

router.use("/student/", require("./student"));
router.use("/checker/", require("./checker"));
router.use("/teacher/", require("./teacher"));

router.use((req, res) => {
	res.status(404).end(JSON.stringify({
		result: -1,
	}));
});

module.exports = router;
