import { connectToDatabase } from "../../../utils/mongodb"

export default async function handler(req, res) {
  const { db } = await connectToDatabase()
  try {
    console.log(req.query.code);

    db.collection("customers").findOne({ code:  parseInt(req.query.code)}, (err, r) => {
      if (err) console.log(err)

      res.json(r)
    })
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
