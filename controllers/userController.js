import db from "../database/database.js"

export async function getUser(req, res) {
  const { id } = req.params
  const { userId } = res.locals

  // validate user based on the token
  if (userId !== Number(id)) {
    return res.sendStatus(401)
  }

  try {
    // get user data
    const user = await db.query(`SELECT id, name FROM users WHERE id = $1`, [id])

    // get user urls
    const urls = await db.query(
      `
      SELECT u.id, u."shortUrl", u.url, u."visitCount"
      FROM urls u 
      JOIN "userUrls" ON "userUrls"."urlId" = u.id
      WHERE "userUrls"."userId" = $1
    `,
      [id]
    )

    // count total number of visits
    let counter = 0
    urls.rows.forEach(({ visitCount }) => (counter += visitCount))

    // modify user data
    user.rows[0].visitCount = counter
    user.rows[0].shortenedUrls = urls.rows

    res.status(200).send(user.rows[0])
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function getRank(req, res) {
  try {
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}
