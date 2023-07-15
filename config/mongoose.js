const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const dbConnection = () => {
  mongoose.connect(
    // "mongodb+srv://shrook:KSSl3g4bURgEFwxy@cluster0.kgf2ma6.mongodb.net/learnning_Website_DB?retryWrites=true&w=majority",
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
    process.env.DB_URI
  );
};
module.exports = dbConnection;
