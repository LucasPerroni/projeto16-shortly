import { Router } from "express"

import { shortenUrl, getUrl, openUrl, deleteUrl } from "../controllers/urlController.js"

import token from "../middlewares/token.js"
import urlSchema from "../middlewares/urlSchema.js"
import { deleteUrlMiddleware } from "../middlewares/deleteUrlMiddleware.js"

const urlRouter = Router()

urlRouter.post("/urls/shorten", token, urlSchema, shortenUrl)
urlRouter.get("/urls/:id", getUrl)
urlRouter.get("/urls/open/:shortUrl", openUrl)
urlRouter.delete("/urls/:id", token, deleteUrlMiddleware, deleteUrl)

export default urlRouter
