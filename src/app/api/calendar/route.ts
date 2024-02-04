import { NextRequest, NextResponse } from 'next/server';
import { getCalendar } from './calendar';

const calendar = getCalendar();
const calendarId = process.env.CALENDAR_ID;

export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams?.get('startDate');
    const endDate = searchParams?.get('endDate');

    if (!startDate || !endDate) {
        return NextResponse.json(
            { message: 'Missing start or end date' },
            { status: 400 },
        );
    }

    const events = await calendar.events.list({
        calendarId,
        timeMin: new Date(startDate).toISOString(),
        timeMax: new Date(endDate).toISOString(),
        maxResults: 2500,
        singleEvents: true,
        orderBy: 'startTime',
    });

    return NextResponse.json(events.data.items, { status: 200 });
};

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    const { startDate, endDate, summary, description } = body;

    const event = {
        description: description,
        title: summary,
        summary: summary,
        start: {
            dateTime: startDate,
        },
        end: {
            dateTime: endDate,
        },
    };

    const result = await calendar.events.insert({
        calendarId,
        requestBody: event,
    });

    return NextResponse.json(result.data, { status: 200 });
};

export const DELETE = async (request: NextRequest) => {
    const body = await request.json();
    const { eventId } = body;

    const result = await calendar.events.delete({
        calendarId,
        eventId,
    });

    return NextResponse.json(result.data, { status: 200 });
};

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
