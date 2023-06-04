import express from "express";
const app = express();

// const EventEmitter = require("events");
import { EventEmitter } from "events";
console.log("first");

const eemter = new EventEmitter();

eemter.on("premGo", () => {
  console.log("this is inside eemetr.on. so you have fired premG event");

  eemter.emit("premCome");
});

eemter.on("premCome", () => {
  console.log("coming home");
});

// routers
app.get("/register", (req, res) => {
  res.send("<h1>Contact page</h1>");
});
app.get("/contact", (req, res) => {
  res.send("<h1>Contact page</h1>");
});

app.get("/", (req, res) => {
  res.send("<h1>hehehe</h1>");
  eemter.emit("premGo");
});

// running server in port 8000
app.listen(8000, (error) => {
  error
    ? console.log(error.message)
    : console.log("your server is running at http://localhost:8000");
});
