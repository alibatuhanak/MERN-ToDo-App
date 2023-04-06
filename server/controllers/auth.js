const Auth = require("../models/auth.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { ACCESS_TOKEN_SECRET } = process.env;

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await Auth.findOne({ email });

		// if (user.length || password.length === 0) {
		// 	return res.status(500).json({ auth: false, msg: "Invalid email or password." });
		// }

		if (!user) {
			return res.status(500).json({ auth: false, msg: "User does not exist." });
		}

		const passwordCompare = await bcrypt.compare(password, user.password);

		if (!passwordCompare) {
			return res.status(500).json({ auth: false, msg: "Wrong password" });
		}

		const AccessToken = await jwt.sign({ id: user._id, user_email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: "10d" });

		res.status(200).json({ status: "OK", user, AccessToken });
	} catch (error) {
		return res.status(500).json(error);
	}
};

const register = async (req, res) => {
	try {
		const { email, username, password } = req.body;

		const user = await Auth.findOne({ email });

		if (user) {
			return res.status(500).json({ auth: false, msg: "Email already exist." });
		}
		if (username.length === 0) {
			return res.status(500).json({ auth: false, msg: "Invalid username" });
		}
		if (password.length < 8) {
			return res.status(500).json({ auth: false, msg: "Password must have at least 8 characters." });
		}

		const passwordHash = await bcrypt.hash(password, 10);

		if (!isEmail(email)) {
			return res.status(500).json({ auth: false, msg: "Invalid e-mail address." });
		}

		const newUser = await Auth.create({ email, username, password: passwordHash });

		res.status(200).json({ status: "OK", newUser });
	} catch (error) {
		return res.status(500).json(error);
	}
};
function isEmail(email) {
	var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	if (email !== "" && email.match(emailFormat)) {
		return true;
	} else {
		return false;
	}
}

const changePassword = async (req, res) => {
	try {
		const { email, current_password, password1, password2 } = req.body;

		if (req.user === email) {
			const user = await Auth.findOne({ email });

			if ((password1.length || password2.length) <= 8) {
				return res.status(500).json({ code: 500, msg: "Minimum password length is 8" });
			}

			if (password1 !== password2) {
				return res.status(500).json({ code: 500, msg: "Your new passwords does not match." });
			}

			const comparePassword = await bcrypt.compare(current_password, user.password);

			if (!comparePassword) {
				return res.status(500).json({ code: 500, msg: "Your current password is wrong." });
			}

			const newPassword = await bcrypt.hash(password1, 10);

			await Auth.findOneAndUpdate({ email }, { password: newPassword });

			res.status(200).json({ code: 200, msg: "Your password updated successfully." });
		} else {
			return res.status(500).json({ code: 500, msg: "Your email does not match" });
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports = { login, register, changePassword };
