import express, { json } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import usersRoute from './routes/users';
import swaggerDocument from '../swagger.json';
import incidentRoute from './routes/incidents';


const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(usersRoute);
app.use(incidentRoute);

app.get('/api/v1/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to iReporter',
  });
});

app.all('*', (req, res) => {
  res.status(404).json({
    message: 'No such endpoint exist',
  });
});
const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
