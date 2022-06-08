import { Router } from "express"

import { getUser, getRank } from "../controllers/userController.js"

const userRouter = Router()

userRouter.get("/users/:id", getUser)
userRouter.get("/users/ranking", getRank)

export default userRouter
