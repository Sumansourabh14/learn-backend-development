const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const port = 7000;

const users = [];

app.set("view engine", "ejs");

// for accessing the form data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  const { token } = req.cookies;
  console.log({ token });

  if (token) {
    console.log("Token is present!");
    res.render("logout");
  } else {
    console.log("Token is NOT present!");
    res.render("login");
  }
});

app.get("/login", (req, res) => {
  res.render("login", { clubName: "Chelsea", clubName2: "Liverpool" });
});

app.post("/submit-form", (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (req.body === undefined) {
    res.send("Something wrong with submitting the form");
  } else {
    res.cookie("token", "User logged in!", {
      httpOnly: true,
    });

    users.push({ emailOfUser: email, passwordOfUser: password });
    res.redirect("/");
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.redirect("/login");
});

app.get("/users", (req, res) => {
  res.json({ users });
});

app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
