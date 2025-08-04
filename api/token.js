import { google } from 'googleapis';

export default async function handler(req, res) {
  try {
    const scopes = ['https://www.googleapis.com/auth/calendar'];

    const jwtClient = new google.auth.JWT({
      email: process.env.CLIENT_EMAIL,
      key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes,
    });

    await jwtClient.authorize();

    const token = jwtClient.credentials.access_token;

    return res.status(200).json({ access_token: token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
