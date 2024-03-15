const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")

const bodyParser = require("body-parser")
const userRoutes = require("./routes/userRoutes")

const { createServer } = require('node:http');
const { Server } = require('socket.io');
const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:4000"
    }
  });

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log("connected")
		})
		server.listen(4006, () => {
			console.log('server running at http://localhost:4004');
		  });
		  
	})
	.catch((error) => {
		console.error(error)
	})

app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.use(express.json())
app.use((req, res, next) => {
	next()
})
app.use(cors())
app.use(bodyParser.json())

io.on('connection', socket => {
    console.log('USER CONNECTED: ', socket.id)
    const id = socket.handshake.query.id //allows us to keep a consistent id (in this case its the user id from frontend)
    console.log('id: ', id)
	// socket.join(id)

    // socket.on('send-message', ({recipients, text}) => {
    //     recipients.forEach(recipient => {
    //         const newRecipients = recipients.filter(r => r !== recipient)  //swapping recipients. For example if we have a conversation of 3 people, lets say I am id 123, the others are 456 & 789. When I send a message to 456 & 789. We dont want their recipients to be 456 & 789, they should each be the other recipients in the chat. For 456 it would be 123 & 789, for 789 it would be 123  & 456, etc.
    //         newRecipients.push(id)
    //         socket.broadcast.to(recipient).emit('receive-message', {
    //             recipients: newRecipients, sender: id, text
    //         })
    //     })
    // })
	socket.on("disconnect", () => {
		console.log(`${socket.id} disconnected`)
	})
})


// Routes
app.use("/api/user", userRoutes)

