import express from "express";
const app = express();
const port = 3000;

// Application Middleware must come first before any other route.
app.use((req, res, next) => {
  //   console.log("Time:", Date.minute());
  //   next();
  const date = new Date();
  console.log(date);
  console.log(req.url);

  let hour = 19;
  if (hour < 17) {
    return next();
  }

  res.send("We have closed for the day");
});

app.get("/", (req, res) => {
  //   console.log(req);

  res.status(200).send("<h1>Hello World. This is my first Backend</h1>");
});

app.get("/contact", (req, res) => {
  res.status(204).send("You can contact me on instagram");
});

app.get("/register", (req, res) => {
  res.status(201).json({
    name: "Chima",
    married: false,
    age: 10,
    hobbies: ["Football", "Movies", "Concerts"],
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
