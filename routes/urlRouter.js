import { Router } from "express"

import { shortenUrl, getUrl, openUrl, deleteUrl } from "../controllers/urlController.js"

import token from "../middlewares/token.js"

const urlRouter = Router()

urlRouter.post("/urls/shorten", token, shortenUrl)
urlRouter.get("/urls/:id", getUrl)
urlRouter.get("/urls/open/:shortUrl", openUrl)
urlRouter.delete("/urls/:id", token, deleteUrl)

export default urlRouter
