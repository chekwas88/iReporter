import express, { json } from 'express';
import middleware from './middleware/middleware';
import incidentApi from './api/incident';
import userApi from './api/user';


const app = express();

app.use(json());
app.use(incidentApi);
app.use(userApi);
app.use((req, res, next) => {
  next(new Error('error occured'));
});
app.use(middleware);

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
