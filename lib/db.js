const MongoClient = require("mongodb").MongoClient;

module.exports = MongoClient.connect(require("../config").db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then((ret) => {
	module.exports = ret.db("attendance");
	console.log("DB Connection Started");
}).catch(e => {
	console.log("DB Connection Failed");
	console.log(e);
	process.exit(0);
});
