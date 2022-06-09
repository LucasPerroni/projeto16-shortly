import { Router } from "express"

import { postSignUp, postSignIn } from "../controllers/loginController.js"

import { signinMiddleware } from "../middlewares/signinMiddleware.js"
import { signupMiddleware } from "../middlewares/signupMiddleware.js"

const loginRouter = Router()

loginRouter.post("/signup", signupMiddleware, postSignUp)
loginRouter.post("/signin", signinMiddleware, postSignIn)

export default loginRouter
