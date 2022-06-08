import db from "../database.js"

export async function postSignUp(req, res) {
  try {
    res.sendStatus(200)
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
