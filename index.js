import express from "express";

const app = express();

const port = 7000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { clubName: "Chelsea", clubName2: "Liverpool" });
});

app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
