const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const path = require("path")
const cookieSession = require("cookie-session")
const passport = require("passport")
const {Server} = require('socket.io')
require('dotenv').config()


const connectDB = require('./db/connect')

const {
	DB_USER,
	DB_PASSWORD,
	DB_NAME,
	COOKIE_KEY,
	PORT,
	NODE_ENV,
	CLIENT_URL,
} = process.env;



app.set('trust proxy', true)

app.use(
	cookieSession({
		name: 'session',
		keys: [COOKIE_KEY],
		maxAge: 24 * 60 * 60 * 1000, // session will expire after 24 hours
		secure: NODE_ENV === 'development' ? false : true,
		sameSite: NODE_ENV === 'development' ? false : 'none',
	})
);

app.use(bodyParser.json())
app.use(passport.initialize())



const port = process.env.PORT || 5000

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`Port is listening on ${port}`));
	} catch (error) {
		console.log(error);
	}
};


start()