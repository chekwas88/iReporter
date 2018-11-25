const express = require('express');
const Incident = require('./model/incident');

const app = express();
app.use(express.json());

app.get('/api/v1/red-flags', (req, res) => {
  const status = res.statusCode;
  Incident.status = status;
  res.send(Incident);
});

app.post('/api/v1/red-flags', (req, res) => {
  // const status = res.statusCode;
  // Incident.status = status;
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
});

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
