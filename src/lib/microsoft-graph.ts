import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch';

let accessToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken() {
  // Check if we have a valid cached token
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const tokenEndpoint = `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`;
  
  const params = new URLSearchParams({
    client_id: process.env.MICROSOFT_CLIENT_ID!,
    client_secret: process.env.MICROSOFT_CLIENT_SECRET!,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await response.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1 min early
  
  return accessToken;
}

export async function getGraphClient() {
  const token = await getAccessToken();
  
  return Client.init({
    authProvider: (done) => {
      done(null, token);
    },
  });
}