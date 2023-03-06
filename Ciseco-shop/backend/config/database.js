const mongoose = require("mongoose")

const connectDB = () => {
  mongoose.set("strictQuery", false)

  mongoose
    .connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`Connected to DB with HOST : ${con.connection.host}`)
    })
}

module.exports = connectDB
