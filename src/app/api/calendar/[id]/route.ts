import { NextRequest, NextResponse } from 'next/server';
import { getCalendar } from '../calendar';
import { NextApiRequest } from 'next';

const calendar = getCalendar();
const calendarId = process.env.CALENDAR_ID;

export const DELETE = async (
    request: NextApiRequest,
    { params }: { params: { id: string } },
) => {
    const eventId = params.id;

    try {
        const response = await calendar.events.delete({
            calendarId,
            eventId,
        });

        return NextResponse.json('ok', { status: 200 });
    } catch (error) {
        return NextResponse.json('error', { status: 500 });
    }
};

// https://calendar.google.com/calendar/u/0/r/eventedit/MHJocjM0bjFxNjYxZHRwdHRlODZ0M29jb2MgNzY4ZDNmYzNmN2ZhMDI5ZTgxODI2OWFmMTFhNTllMWRiN2E3MjQ3MjJhODA3ZjNiNWUwNGE2NDMwNDc4ZDI3NUBn
// export const deleteEvents = async () => {
//     const calendar = getCalendar();

//     const events = await getEvents({
//         startDate: new Date('2020-01-01T00:00:00.000Z').toISOString(),
//         endDate: new Date('2023-12-01T00:00:00.000Z').toISOString(),
//     });

//     events.data.items?.forEach(async (event) => {
//         await calendar.events.delete({
//             calendarId,
//             eventId: event.id!,
//         });
//     });
// };
