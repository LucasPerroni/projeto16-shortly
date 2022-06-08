import db from "../database.js"

export async function getUser(req, res) {
  try {
    res.sendStatus(200)
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
