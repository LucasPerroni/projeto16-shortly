import { Router } from "express"

import { postSignUp, postSignIn } from "../controllers/loginController.js"

const loginRouter = Router()

loginRouter.post("/signup", postSignUp)
loginRouter.post("/signin", postSignIn)

export default loginRouter
