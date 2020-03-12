const express = require('express');
const router = express.Router();
const morgan = require("morgan");
const layout = require('./views/layout.js')
const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

// parses json bodies
app.use(express.json())

// app.use('/posts', routes);

app.get("/", (req, res) => {
  let html = `<h1>HELLO WORLD</h1>`
  res.send(layout(html));
})

const PORT = 3030;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
