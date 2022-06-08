import bcrypt from "bcrypt"

import db from "../database/database.js"

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
    console.log(e)
    res.sendStatus(500)
  }
}

export async function postSignIn(req, res) {
  try {
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}
