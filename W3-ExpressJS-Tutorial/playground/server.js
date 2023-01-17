const express = require('express');
const { nextTick } = require('process');
const ejs = require('ejs');


const app = express();
const morgan = require('morgan');

app.set('view engine', 'ejs');

app.listen(3000, () => console.log('Listening on port 3000...'));

const auth = (req, res, next) => {
  if (true) {
    console.log('go ahead user!');
    next();
  }
  else
    res.send("You are not logged in")
}

const adminsOnly = (req, res, next) => {
  console.log('go ahead admin!');
  if (true)
    next();
  else
    res.send("You are not an admin")
}
app.use(auth);
app.get('/login', (req, res, next) => {
  res.send("Login");
});

app.use(adminsOnly);
app.get('/adminDash', (req, res) => {
  res.send("ADmin Dashboard");
});

app.use(morgan('tiny'))

