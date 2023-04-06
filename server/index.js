const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
require("dotenv").config();

const AuthRoute = require("./routes/auth");
const HomeRoute = require("./routes/home");

const PORT = process.env.PORT || 5000;
const URI = process.env.URI;

app.use("/avatars/uploads", express.static(path.join(__dirname, "/uploads")));
console.log(path.join(__dirname, "/uploads"));
// app.use("/avatars/uploads", express.static(path.join(__dirname, "../client", "public", "uploads")));
//app.use(express.static(path.join(__dirname, "../client", "public")));
//console.log(path.join(__dirname, "../client", "public"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connect = async () => {
	try {
		await mongoose.connect(URI, { dbName: "userDB", useNewUrlParser: true, useUnifiedTopology: true });
		console.log("MongoDB connected");
	} catch (error) {
		console.log("Database connection failed");
		console.log(error);
	}
};
connect();

app.use("/auth", AuthRoute);

app.use("/todo", HomeRoute);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
