import express, { json } from 'express';
import incidents from './controllers/incident';
import users from './controllers/users';
import validate from './middleware/validate';

const app = express();

app.use(json());
// incidents endpoints
app.get('/api/v1/red-flags', incidents.getIncidents);
app.post('/api/v1/red-flags', validate.validatePost, incidents.createIncident);
app.get('/api/v1/red-flags/:id', incidents.getIncident);
app.patch('/api/v1/red-flags/:id/location', validate.validatePatchLocation, incidents.updateLocation);
app.patch('/api/v1/red-flags/:id/comment', validate.validatePatchComment, incidents.updateComment);
app.delete('/api/v1/red-flags/:id', incidents.deleteIncident);
app.patch('/api/v1/red-flags/:id', validate.validatePatchEdit, incidents.updateAll);


// users endpoints
app.post('/users/register', validate.validateUser, users.registerUser);
app.post('/auth/users/login', users.login);

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
