import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import loginRouter from "./routes/loginRouter.js"
import urlRouter from "./routes/urlRouter.js"
import userRouter from "./routes/userRouter.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// routes
app.use(loginRouter)
app.use(urlRouter)
app.use(userRouter)

// port
const port = process.env.PORT || 4000
app.listen(port, () => console.log("Server is running"))
