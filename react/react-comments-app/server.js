const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5001;

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Basic route
app.get("/", (req, res) => {
  res.send("Comments API");
});

//Empty mock database
let comments = [];

//Get comments
app.get("/api/comments", (req, res) => {
  res.json(comments);
});

//Post new comment
app.post("/api/comments", (req, res) => {
  const { content } = req.body;
  if (content) {
    comments.push({ content });
    res.status(201).json({ message: "Comment added" });
  } else {
    res.status(400).json({ message: "Comment cannot be empty" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
