const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Auth = require("../models/auth");

require("dotenv").config();

const { ACCESS_TOKEN_SECRET } = process.env;

const verifyJWT = async (req, res, next) => {
	const authHeader = req.headers.Authorization || req.headers.authorization;

	if (!authHeader?.startsWith("Bearer ")) {
		return res.status(500).json({ auth: false, msg: "Unauthorized" });
	}
	const token = authHeader.split(" ")[1];

	jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, decoded) => {
		if (err) {
			return res.status(500).json({ auth: false, msg: "Token expired or invalid token." });
		} else {
			req.userId = decoded.id;
			req.user = decoded.user_email;
			next();
		}
	});
};

module.exports = verifyJWT;
