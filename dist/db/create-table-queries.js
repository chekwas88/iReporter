"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable operator-linebreak */
var usersTable = "CREATE TABLE IF NOT EXISTS\n    users(\n      id SERIAL PRIMARY KEY NOT NULL,\n      firstname VARCHAR(40) NOT NULL,\n      lastname VARCHAR(40) NOT NULL,\n      othername VARCHAR(40),\n      username VARCHAR(40) NOT NULL,\n      email VARCHAR(128) NOT NULL,\n      password VARCHAR(100) NOT NULL,\n      phoneNumber VARCHAR(100) NOT NULL,\n      isAdmin BOOLEAN DEFAULT true,\n      registered TIMESTAMP WITH TIME ZONE DEFAULT now()\n    );";

var incidentTable = "CREATE TABLE IF NOT EXISTS \n    incidents(\n    incident_id SERIAL PRIMARY KEY,\n    createdBy INT REFERENCES users(id) ON DELETE CASCADE,\n    location VARCHAR(100) NOT NULL,\n    title TEXT NOT NULL,\n    images text[],\n    videos text[],\n    comment TEXT NOT NULL,\n    status VARCHAR(100) NOT NULL DEFAULT 'draft',\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()\n  );";
var createTableQueries = "" + usersTable + incidentTable;
exports.default = createTableQueries;