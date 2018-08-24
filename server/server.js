const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
//setup for Heroku or local environment
const port = process.env.PORT || 3000;

//setting up express
var app = express();

app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log(`Server is up on ${port}`);
});
