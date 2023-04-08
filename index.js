const express = require("express");

const app = express();

const port = 7000;

const users = [];

app.set("view engine", "ejs");

// for accessing the form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { clubName: "Chelsea", clubName2: "Liverpool" });
});

app.post("/submit-form", (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (req.body === undefined) {
    res.send("Something wrong with submitting the form");
  } else {
    users.push({ emailOfUser: email, passwordOfUser: password });
    res.send("Form submitted!");
  }
});

app.get("/users", (req, res) => {
  res.json({ users });
});

app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
