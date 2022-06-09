import joi from "joi"

export default function urlSchema(req, res, next) {
  const urlSchema = joi.object({
    url: joi.string().uri().required(),
  })
  const validation = urlSchema.validate(req.body, { abortEarly: false })
  if (validation.error) {
    return res.status(422).send(validation.error.details.map((e) => e.message))
  }

  next()
}
