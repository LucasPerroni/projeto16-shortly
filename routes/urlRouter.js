import { Router } from "express"

import { shortenUrl, getUrl, openUrl, deleteUrl } from "../controllers/urlController.js"

const urlRouter = Router()

urlRouter.post("/urls/shorten", shortenUrl)
urlRouter.get("/urls/:id", getUrl)
urlRouter.get("/urls/open/:shortUrl", openUrl)
urlRouter.delete("/urls/:id", deleteUrl)

export default urlRouter
