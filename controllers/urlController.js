import { nanoid } from "nanoid"

import db from "../database/database.js"

export async function shortenUrl(req, res) {
  const { userId } = res.locals
  const shortUrl = nanoid()

  try {
    // insert url and shortUrl in "urls" table
    await db.query(
      `
      INSERT INTO urls (url, "shortUrl") 
      VALUES ($1, $2)`,
      [req.body.url, shortUrl]
    )

    // get urlId from "urls" table
    const urlId = await db.query(`SELECT id FROM urls WHERE "shortUrl" = '${shortUrl}'`)

    // insert urlId and userId in "userUrls" table (n:m)
    await db.query(
      `
      INSERT INTO "userUrls" ("userId", "urlId")
      VALUES ($1, $2)
    `,
      [userId, urlId.rows[0].id]
    )

    res.status(201).send({ shortUrl: shortUrl })
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function getUrl(req, res) {
  const { id } = req.params

  try {
    const url = await db.query(`SELECT id, url, "shortUrl" FROM urls WHERE id = $1`, [id])
    if (!url.rows[0]) {
      return res.sendStatus(404)
    }

    res.status(200).send(url.rows[0])
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function openUrl(req, res) {
  const { shortUrl } = req.params

  try {
    // get url based on the shortUrl
    const url = await db.query(
      `
      SELECT url
      FROM urls 
      WHERE "shortUrl" = $1
    `,
      [shortUrl]
    )

    // check if url exists
    if (!url.rows[0]) {
      return res.sendStatus(404)
    }

    // update visitCount of the url
    await db.query(
      `
      UPDATE urls 
      SET "visitCount" = "visitCount" + 1 
      WHERE "shortUrl" = $1
    `,
      [shortUrl]
    )

    res.redirect(url.rows[0].url)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params

  try {
    // delete n:m relation between "users" and "urls"
    await db.query(`DELETE FROM "userUrls" WHERE "urlId" = $1`, [id])

    // delete url from "urls" table
    await db.query(`DELETE FROM urls WHERE id = $1`, [id])

    res.sendStatus(204)
  } catch (e) {
    res.sendStatus(500)
  }
}
