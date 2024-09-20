const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

app.set('etag', false);

app.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Content-Security-Policy", "script-src 'self' https://www.googletagmanager.com 'unsafe-inline' 'unsafe-eval'");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; preload");
  next();
});

app.use(express.static("dist"));

app.use((req, res, next) => {
  if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
    next();
  } else {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
