import { connectToDatabase } from "../../../utils/mongodb"

export default async function handler(req, res) {
  const { db } = await connectToDatabase()
  try {
    let dept
    if (req.body.type === "takatsu") {
      dept = "YCゆりのき高津"
    } else if (req.body.type === "funabashi") {
      dept = "森永ミルクセンター船橋"
    } else if (req.body.type === "yachiyo") {
      dept = "森永ミルクセンター八千代"
    } else if (req.body.type === "chuo") {
      dept = "YC東金中央"
    } else if (req.body.type === "tobu") {
      dept = "YC東金東部"
    }

    db.collection("customers").findOne(
      { code: req.query.code, dept },
      (err, r) => {
        if (err) console.log(err)
        if (!r) {
          res.json("")
        } else if (
          req.body.name.replace(/\s/g, "") ===
          r.name.substring(0, r.name.search(/\s/))
        ) {
          res.json(r)
        } else if (req.body.name === r.name) {
          res.json(r)
        } else {
          res.json({ name: 404 })
        }
      }
    )
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
