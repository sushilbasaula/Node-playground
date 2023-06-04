import express from "express";
const app = express();
const PORT = 8000;

import path from "path";
import fs from "fs";

const __dirname = path.resolve();
const fn = __dirname + "/userList.csv";

// middleware
app.use(express.urlencoded());

// routers
app.get("/register", (req, res) => {
  console.log(req.query);

  //   res.send("<h1>You are in the registration</h1>");

  res.sendFile(__dirname + "/src/regForm.html");
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const str = `${email},${password}\n`;
  fs.appendFile(fn, str, (error) => {
    error ? console.log(error.message) : console.log("added to the file");
  });

  //   res.send("<h1>You are registered, you may login in now</h1>");

  res.sendFile(__dirname + "/src/regForm.html");
});

app.get("/login", (req, res) => {
  //   res.send("<h1>You are in the Login</h1>");
  res.sendFile(__dirname + "/src/loginForm.html");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const str = `${email},${password}`;

  //read file
  fs.readFile(fn, (error, data) => {
    error && console.log(error.message);

    const userStr = data.toString();
    const userArg = userStr.split("\n");

    if (userArg.includes(str)) {
      res.send("<h1 style='color: green'>Logined successfully</h1>");
    } else {
      res.send("<h1 style='color: red'>Invalid Login</h1>");
    }
  });

  //
  //   res.sendFile(__dirname + "/src/loginForm.html");
});

// root router , home page
app.get("/", (req, res) => {
  console.log("received request to home router");

  res.send(`
  <h1>You are in the homepage</h1>

 <a href="/register">
<button>Register</button>
 </a>

 <a href="/login">
<button>Login</button>
 </a>

  `);
});

// make our server available on http request

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`Server running at http://localhost:${PORT}`);
});
