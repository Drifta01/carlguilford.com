import { google } from 'googleapis';
import path from 'path';

const googleAuth = () => {
    const SCOPES = 'https://www.googleapis.com/auth/calendar';
    const CREDENTIALS_PATH = path.join(
        process.cwd(),
        'google-credentials.json',
    );

    return new google.auth.GoogleAuth({
        keyFile: CREDENTIALS_PATH,
        scopes: [SCOPES],
    });
};

export const getCalendar = () => {
    const auth = googleAuth();
    const calendar = google.calendar({ version: 'v3', auth });
    return calendar;
};
