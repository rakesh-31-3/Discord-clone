import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.end("Hello there");
});

app.listen(8080, () => console.log("8080 Port running"));
