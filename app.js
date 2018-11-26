const express = require('express');
const Incident = require('./model/incident');
const middleware = require('./middleware/middleware');

const app = express();
app.use(express.json());


app.get('/api/v1/red-flags', (req, res, next) => {
  const status = res.statusCode;
  Incident.status = status;
  res.send(Incident);
  next();
});

app.post('/api/v1/red-flags', middleware, (req, res, next) => {
  const id = Incident.incidents.length;
  const redFlag = {
    id,
    createdBy: req.body.createdBy,
    createdOn: req.body.createdOn,
    type: req.body.type,
    title: req.body.title,
    comment: req.body.comment,
    location: req.body.location,
  };
  Incident.incidents.push(redFlag);
  res.json({
    status: res.statusCode,
    incidents: [
      {
        id,
        message: 'red-flag incident was created successfully',
      },
    ],
  });
  next();
});

app.get('/api/v1/red-flags/:id', (req, res, next) => {
  const incident = Incident.incidents.find(i => i.id === parseInt(req.params.id, 10));
  if (!incident) {
    next();
  }
  // res.send(incident);
  res.json({
    status: res.statusCode,
    incidents: [
      incident,
    ],
  });
});

app.use((req, res, next) => {
  next(new Error('error occured'));
});

app.use(middleware);


const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
