// import http from "http";
// // import { randomVariable } from "./random.js"; // .js extension is mandatory!
// import fs from "fs";
// import * as randomVariables from "./random.js";

// const { randomVariable, randomVariable1 } = randomVariables; // destructured!

// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     fs.readFile("./package.json", (err, data) => {
//       if (err) {
//         res.end("Error has occured: " + err.message);
//       } else {
//         res.end("Read successful");
//       }
//     });
//   } else if (req.url === "/about") {
//     res.end("About Page");
//   } else {
//     res.end("Server running");
//   }
// });

// const port = 7000;

// server.listen(port, () => {
//   console.log("Server running at http://localhost:" + port);
// });

import express from "express";

const app = express();

const port = 7000;

app.get("/", (req, res) => {
  res.send("Working!");
});

app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
