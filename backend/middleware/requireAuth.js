const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const jwtDecode = require("jwt-decode")

const requireAuth = async (req, res, next) => {
	//verify user is authenticated
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(401).json({ error: "Authorization token required" })
	}

	const token = authorization.split(" ")[1]
	const decodedToken = jwtDecode(token)
	const dateNow = new Date()

	if (decodedToken.exp < dateNow.getTime() / 1000) {
		console.log("token is expired")
		res.status(400).json({ msg: "token expired" })
		return
	} else {
		console.log("token is valid")
	}

	try {
		const { _id } = jwt.verify(token, process.env.SECRET)
		req.user = await User.findOne({ _id }).select("_id") //returns just id from user document
		if (!req.user) {
			res.status(401).json({ error: "User does not exist" })
			return
		}
		next()
	} catch (err) {
		console.error(err)
		res.redirect("/")
		res.status(401).json({ error: "Token is not valid" })
	}
}

module.exports = requireAuth
