import express from "express";
const app = express();
const port = 3000;

import morgan from "morgan";
import fs from "fs";

// Example of third party middleware
// app.use(morgan("tiny"));
// app.use(morgan("combined"));
app.use(morgan("dev"));

// Example using Built-in middleware
app.use(express.json());

// Application Middleware must come first before any other route.
app.use((req, res, next) => {
  //   console.log("Time:", Date.minute());
  //   next();
  const date = new Date();
  console.log(date);
  console.log(req.url);

  let hour = 12;
  if (hour < 17) {
    return next();
  }

  res.status(300).send("We have closed for the day");
});

app.get("/", (req, res) => {
  const fileContent = fs.readFileSync("public/index.html", "utf-8");
  res.status(200).send(fileContent);
});

app.get("/contact", (req, res) => {
  res.status(204).send("You can contact me on instagram.");
});

app.get("/register", (req, res) => {
  console.log(req.body);

  res.status(201).json({
    name: "Chima",
    married: false,
    age: 10,
    hobbies: ["Football", "Movies", "Concerts"],
  });
});

app.get(
  "/admin-dashboard",
  (req, res, next) => {
    let userType = "user";

    if (userType === "admin") {
      return next();
    }

    res.send("<h2>No Access</h2>");
  },
  (req, res) => {
    res.send("Welcome to dashboard.");
  }
);

app.get(
  "/beer-barn",
  (req, res, next) => {
    let age = 7;

    if (age > 21) {
      return next();
    }
    res.send("<h1>OOOOPPSS!!! YOU CAN'T DRINK AT OUR BAR.</h1>");
  },
  (req, res) => {
    res.send("<h1>HURRAY!!! YOU CAN DRINK AT OUR BAR.</h1>");
  }
);

app.get("/login", (req, res) => {
  res.send("Logged in.");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).send("Sorry an internal Error occured");
});

// Listening to server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
