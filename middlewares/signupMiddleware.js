import joi from "joi"

import db from "../database/database.js"

export async function signupMiddleware(req, res, next) {
  // validate req.body format
  const signupSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
  })
  const validation = signupSchema.validate(req.body, { abortEarly: false })
  if (validation.error) {
    return res.status(422).send(validation.error.details.map((e) => e.message))
  }

  try {
    // check if there's no other user with the same email
    const account = await db.query(`SELECT * FROM users WHERE email = $1`, [req.body.email])
    if (account.rows[0]) {
      return res.sendStatus(409)
    }

    next()
  } catch (e) {
    res.sendStatus(500)
  }
}
