import joi from "joi"

export async function signinMiddleware(req, res, next) {
  const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  })
  const validation = signinSchema.validate(req.body, { abortEarly: false })
  if (validation.error) {
    return res.status(422).send(validation.error.details.map((e) => e.message))
  }

  next()
}
