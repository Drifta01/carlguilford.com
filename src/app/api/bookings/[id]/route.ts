import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

const bookingsDTO: Prisma.BookingsSelect = {
    BookingId: true,
    UniqueId: true,
    BookingDate: true,
    DateBooked: true,
    EventId: true,
    Price: true,
};

export const GET = async (
    request: NextRequest,
    { params }: { params: Record<string, number> },
) => {
    const id = Number(params.id);

    const bookings = await prisma.bookings.findUnique({
        select: bookingsDTO,
        where: {
            BookingId: id,
        },
    });

    return NextResponse.json(bookings, { status: 200 });
};
