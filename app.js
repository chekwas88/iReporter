const express = require('express');
const response = require('./model/response');

const app = express();

app.get('/api/v1/red-flags', (req, res) => {
  const status = res.statusCode;
  response.status = status;
  res.send(response);
});

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
