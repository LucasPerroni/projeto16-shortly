import { Router } from "express"

import { getUser, getRank } from "../controllers/userController.js"

import token from "../middlewares/token.js"

const userRouter = Router()

userRouter.get("/users/:id", token, getUser)
userRouter.get("/ranking", getRank)

export default userRouter
