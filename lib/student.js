const db = require("./db");

const getStudent = async (num, name = undefined) => {
	let obj = {num, name};
	if (name === undefined) delete obj.name;
	return await db.collection("students").findOne(obj);
}, existsStudent = async (num, name = undefined) => {
	return await getStudent(num, name) !== null;
}, getAttendanceLog = async (num) => {
	return (await db.collection("tables").find({num}).toArray()).map(obj => obj.time).sort((a, b) => a - b);
}, pushAttendance = async (num) => {
	if (!await existsStudent(num)) return -1;
	let data = await db.collection("tables").findOne({
		num,
		time: {
			$gte: (new Date()).setHours(0, 0, 0, 0)
		}
	});
	if (data !== null) return 1;
	await db.collection("tables").insertOne({
		num,
		time: Date.now()
	});
	return 0;
};

module.exports = {getStudent, existsStudent, getAttendanceLog, pushAttendance};
