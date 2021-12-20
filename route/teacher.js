const express = require("express");
const db = require("../lib/db");
const router = express.Router();

router.use(async (req, res, next) => {
    let {authorization} = req.headers;
    if (typeof authorization !== "string") {
        res.status(403).end(JSON.stringify({
            result: -1,
        }));
        return;
    }
    if (authorization !== require("../config").teacher_token) {
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

router.get("/get", async (req, res) => {
    res.end(JSON.stringify({
        result: 0,
        result_data: await db.collection("tables").find({
            time: {
                $gte: (new Date()).setHours(0, 0, 0, 0)
            }
        }).toArray(),
    }));
});

module.exports = router;
