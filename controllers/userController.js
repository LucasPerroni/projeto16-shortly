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
    // get user ranking based on the count of visits of the user urls
    // if the visits are the same for two users, then the ranking is based on the count of urls of the user
    const ranking = await db.query(`
      SELECT u.id, u.name, COUNT(urls.url) "linksCount", SUM(urls."visitCount") "visitCount"
      FROM users u
      LEFT JOIN "userUrls" ON u.id = "userUrls"."userId"
      LEFT JOIN urls ON urls.id = "userUrls"."urlId"
      GROUP BY u.name, u.id
      ORDER BY "visitCount" DESC NULLS LAST, "linksCount" DESC, u.id ASC   
      LIMIT 10 
    `)

    // modify "linksCount" and "visitCount" from objects
    ranking.rows.forEach(({ linksCount, visitCount }, i) => {
      if (!visitCount) {
        ranking.rows[i].visitCount = 0
      } else {
        ranking.rows[i].visitCount = Number(visitCount)
      }

      ranking.rows[i].linksCount = Number(linksCount)
    })

    res.status(200).send(ranking.rows)
  } catch (e) {
    res.sendStatus(500)
  }
}
