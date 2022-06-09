import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

import db from "../database/database.js"

dotenv.config()

export async function postSignUp(req, res) {
  const { name, email, password } = req.body
  const passwordHash = bcrypt.hashSync(password, 10)

  try {
    await db.query(
      `
      INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3)`,
      [name, email, passwordHash]
    )

    res.sendStatus(201)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function postSignIn(req, res) {
  try {
    // check if user exists and if password is correct
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [req.body.email])
    if (!user.rows[0] || !bcrypt.compareSync(req.body.password, user.rows[0].password)) {
      return res.sendStatus(401)
    }

    // token configuration
    const data = { userId: user.rows[0].id }
    const key = process.env.JWT_KEY
    const config = { expiresIn: 60 * 60 } // 60 minutes

    const token = jwt.sign(data, key, config)

    res.status(200).send(token)
  } catch (e) {
    res.sendStatus(500)
  }
}
