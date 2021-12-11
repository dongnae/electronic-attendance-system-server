const jsonwebtoken = require("jsonwebtoken");
const crypto = require("crypto");

let privateKey = crypto.randomBytes(16);

const generate = async (num) => {
	return await jsonwebtoken.sign({
		num,
	}, privateKey, {
		expiresIn: 30, // 30 seconds
		issuer: "Dongnae High School",
	});
}, validate = async (jwt) => {
	try {
		return (await jsonwebtoken.verify(jwt, privateKey)).num;
	} catch (e) {
		return false;
	}
};

module.exports = {generate, validate};
