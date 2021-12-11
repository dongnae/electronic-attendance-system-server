process.env.TZ = "Asia/Seoul";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require("./lib/db").then(async () => {
	require("./lib/db").collection("tables").createIndex({time: 1}, {expireAfterSeconds: 60 * 60 * 24 * 14}); // 14 days

	app.use("/api/", require("./route/api"));

	let port = require("./config").server_port;
	app.listen(port, () => {
		console.log(`HTTP server is listening on ${port}`);
	});
});
