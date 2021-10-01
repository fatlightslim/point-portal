import { connectToDatabase } from "../../../utils/mongodb"

export default async function handler(req, res) {
  const { db } = await connectToDatabase()
  try {
    let dept
    if (req.body.type === "yc") {
      dept = "YCゆりのき高津"
    } else if (req.body.type === "funabashi") {
      dept = "森永ミルクセンター船橋"
    } else if (req.body.type === "yachiyo") {
      dept = "森永ミルクセンター八千代"
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
        } else {
          res.json({ name: 404 })
        }
      }
    )
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
