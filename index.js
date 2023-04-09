const express = require("express");
const cookieParser = require("cookie-parser");
const connectToDb = require("./utils/connectDb");
const UserModel = require("./models/userModel");

const app = express();

const port = 7000;

app.set("view engine", "ejs");

// for accessing the form data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDb();

const isAuthenticated = (req, res, next) => {
  const { token } = req.cookies;
  console.log({ token });

  if (token) {
    next();
  } else {
    console.log("Token is NOT present!");
    res.render("login");
  }
};

app.get("/", isAuthenticated, (req, res) => {
  console.log("Token is present!");
  res.render("logout");
});

app.get("/see", isAuthenticated, (req, res) => {
  res.send("Page is accessible only when the user is logged in!");
});

app.get("/login", (req, res) => {
  res.render("login", { clubName: "Chelsea", clubName2: "Liverpool" });
});

app.post("/submit-form", async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (req.body === undefined) {
    res.send("Something wrong with submitting the form");
  } else {
    const user = await UserModel.create({ email, password })
      .then(() => console.log("User created!"))
      .catch((err) => console.log(err));

    res.cookie("token", user?._id, {
      httpOnly: true,
    });

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

app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
