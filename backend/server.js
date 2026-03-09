
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const compression = require("compression")
const rateLimit = require("express-rate-limit")
require("dotenv").config()

const seedData = require("./utils/seedData")
const postRoutes = require("./routes/posts")
const authRoutes = require("./routes/auth")

const app = express()

app.use(express.json())
app.use(cors())
app.use(compression())

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100
})

app.use(limiter)

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("MongoDB connected")
  await seedData()
})
.catch(err => console.log(err))

app.use("/api/posts", postRoutes)
app.use("/api/auth", authRoutes)

app.listen(5000, () => {
  console.log("Server running on port 5000")
})
