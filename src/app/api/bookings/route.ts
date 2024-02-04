import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma-client';
import { NextResponse } from 'next/server';

const bookingDetails: Prisma.BookingsSelect = {
    BookingId: true,
    UniqueId: true,
    BookingDate: true,
    DateBooked: true,
    EventId: true,
};

export const GET = async () => {
    const bookings = await prisma.bookings.findMany({
        select: bookingDetails,
        take: 10,
    });

    return NextResponse.json(bookings, { status: 200 });
};
