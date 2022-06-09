import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export default function token(req, res, next) {
  const { authorization } = req.headers

  try {
    const token = authorization?.replace("Bearer", "").trim()
    if (!token) {
      return res.status(404).send("Token not found")
    }

    const user = jwt.verify(token, process.env.JWT_KEY)

    res.locals.user = user
    next()
  } catch (e) {
    res.status(401).send("Token has expired")
  }
}
