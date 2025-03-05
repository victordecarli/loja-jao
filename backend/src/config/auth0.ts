import dotenv from 'dotenv';

dotenv.config();

export const auth0Config = {
  domain: process.env.AUTH0_DOMAIN || 'meuapp.auth0.com',       // Ex: meuapp.auth0.com
  clientId: process.env.AUTH0_CLIENT_ID || 'CLIENT ID',
  clientSecret: process.env.AUTH0_CLIENT_SECRET || 'CLIENT SECRET',
  audience: process.env.AUTH0_AUDIENCE || 'sua-api-identifier',        // Ex: https://sua-api
  callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
};
