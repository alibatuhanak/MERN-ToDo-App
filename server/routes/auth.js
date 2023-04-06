const express = require("express");
const { login, register, changePassword } = require("../controllers/auth");
const multer = require("multer");
const router = express.Router();

const storage = require("../controllers/avatar.js");
const Auth = require("../models/auth");
const verifyJWT = require("../middlewares/verifyJWT");

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
			cb(null, true);
		} else {
			console.log("only jpg png and jpeg");
			cb(null, false);
		}
	},
});

router.post("/login", login);
router.post("/register", register);

router.patch("/changePassword", verifyJWT, changePassword);

router.patch("/avatar", verifyJWT, upload.single("avatar"), async (req, res) => {
	try {
		const id = req.userId;
		const avatarFileName = req.file.filename;
		const avatarProfile = await Auth.findByIdAndUpdate(id, { $set: { avatar: avatarFileName } });
		console.log(avatarProfile);
		const pathAvatar = "uploads/" + req.file.filename;
		console.log(pathAvatar);
		res.send({ code: 200, msg: "upload success", file: req.file, pathAvatar });
	} catch (error) {
		return res.status(500).json(error);
	}
});

router.get("/avatar", verifyJWT, async (req, res) => {
	try {
		const avatar = await Auth.findById(req.userId);
		res.status(200).json(avatar);
	} catch (error) {
		return res.status(500).json(error);
	}
});

module.exports = router;
