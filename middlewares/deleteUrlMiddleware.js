import db from "../database/database.js"

export async function deleteUrlMiddleware(req, res, next) {
  const { id } = req.params
  const { userId } = res.locals

  try {
    const url = await db.query(
      `
        SELECT urls.id, urls.url, urls."shortUrl", users.id "userId", users.name
        FROM urls
        JOIN "userUrls" ON "userUrls"."urlId" = urls.id
        JOIN users ON users.id = "userUrls"."userId" 
        WHERE urls.id = $1`,
      [id]
    )

    // check if url exists and if url owner is the user
    if (!url.rows[0]) {
      return res.status(404).send("Url not found")
    } else if (url.rows[0].userId !== userId) {
      return res.status(401).send("User isn't the url owner")
    }

    next()
  } catch (e) {
    res.sendStatus(500)
  }
}
