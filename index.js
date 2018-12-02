const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/admin', (req, res) => {
  res.render('admin/admin');
});

app.get('/users/:id/profile', (req, res) => {
  res.render('pages/profile');
});

app.get('/login', (req, res) => {
  res.render('pages/sign-in');
});

app.get('/register', (req, res) => {
  res.render('pages/signup');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app started at ${port}...`));
