const express = require("express");
const articlesRouter = require("./routes/articles");
const Article = require("./models/article");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/blog");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});
app.use("/articles", articlesRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
