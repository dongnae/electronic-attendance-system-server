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
    let result_data = await Promise.all((await db.collection("students").find({}).toArray())
        .map(async ({num, name}) => {
            let ret = {num, name};
            let time = await db.collection("tables").findOne({
                num,
                time: {
                    $gte: (new Date()).setHours(0, 0, 0, 0)
                }
            });
            if (time !== null) ret.time = time.time;
            return ret;
        }));
    res.end(JSON.stringify({
        result: 0,
        result_data
    }));
});

module.exports = router;
