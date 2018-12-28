import express, { json } from 'express';
import usersRoute from './routes/users';
import incidentRoute from './routes/incidents';


const app = express();

app.use(json());
app.use(usersRoute);
app.use(incidentRoute);


// users endpoints
// app.post('/users/register', validate.validateUser, users.registerUser);
// app.post('/auth/users/login', users.login);

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
