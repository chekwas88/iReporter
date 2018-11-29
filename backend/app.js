const express = require('express');
const middleware = require('./middleware/middleware');
const incidentApi = require('./api/incident');
const userApi = require('./api/user');


const app = express();
app.use(express.json());
app.use(incidentApi);
app.use(userApi);
app.use((req, res, next) => {
  next(new Error('error occured'));
});

app.use(middleware);


const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
