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

    // insert urlId and userId in "userUrls" table
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
  try {
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function openUrl(req, res) {
  try {
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function deleteUrl(req, res) {
  try {
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}
