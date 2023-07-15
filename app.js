const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const bodyParser = require("body-parser");
const cookieParser=require('cookie-parser')
const ApiError = require("./utils/apiError");
const globalErroe = require("./middleware/ErrorMiddleware");
const DbConnection = require("./config/mongoose");
const mainRouter = require("./routes/main");
const courseRoute = require("./routes/courseRoute");
const articleRoute = require("./routes/articleRoute");
const trackRoute = require("./routes/TrackRoute");
const taskRoute = require("./routes/taskRoute");
const UserRoute = require("./routes/UserRoute");
const authRoute = require("./routes/AuthRoute");


//connect with db
DbConnection();
// express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "videos")));

//middleware


app.use(express.json());
app.use(cookieParser())
//Mount routes

/* app.use((req,res,next)=>{
  console.log(req.cookies);
  next()
})   */
app.use(mainRouter);
app.use(articleRoute);
app.use(trackRoute);
app.use(taskRoute);
app.use(courseRoute);
app.use("/users", UserRoute);
app.use("/auth", authRoute);

app.all("*", (req, res, next) => {
  res.render("404", {
    courseTitle: undefined,
    path: undefined,
  });});
app.use(globalErroe);

/* app.use((req, res) => {
  res.render("404", {
    courseTitle: undefined,
    path: undefined,
  });
}); */
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

// Handle rejection outside Express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`shutting down server...`);
    process.exit(1);
  });
});
