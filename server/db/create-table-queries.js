/* eslint-disable operator-linebreak */
const usersTable =
  `CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY NOT NULL,
      firstname VARCHAR(40) NOT NULL,
      lastname VARCHAR(40) NOT NULL,
      othername VARCHAR(40),
      username VARCHAR(40) NOT NULL,
      email VARCHAR(128) NOT NULL,
      password VARCHAR(100) NOT NULL,
      phoneNumber VARCHAR(100) NOT NULL,
      isAdmin BOOLEAN DEFAULT true,
      registered TIMESTAMP WITH TIME ZONE DEFAULT now()
    );`;

const incidentTable =
  `CREATE TABLE IF NOT EXISTS 
    incidents(
    incident_id SERIAL PRIMARY KEY,
    createdBy INT REFERENCES users(id) ON DELETE CASCADE,
    location VARCHAR(100) NOT NULL,
    title TEXT NOT NULL,
    images text[],
    videos text[],
    comment TEXT NOT NULL,
    status VARCHAR(100) NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );`;
const createTableQueries = `${usersTable}${incidentTable}`;
export default createTableQueries;
