const express = require('express');
const morgan = require("morgan");
const layout = require('./views/layout.js')
const app = express();
const models = require('./models');
const wikiRoutes = require('./routes/wiki.js');
const userRoutes = require('./routes/user.js');


app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

// parses json bodies
app.use(express.json())

// app.use('/posts', routes);
models.db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.get('/', (req, res, next) => {
    res.redirect('/wiki');
});

app.use('/wiki', wikiRoutes);
app.use('/users', userRoutes);

const init = async () => {
  await models.db.sync()
  const PORT = 3030;

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init()