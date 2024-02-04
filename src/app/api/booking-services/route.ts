import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

const bookingServices = {
    BookingId: true,
    UniqueId: true,
    BookingDate: true,
    DateBooked: true,
    EventId: true,
    BookingServices: {
        ServiceId: true,
        Name: true,
        ServicePrice: true,
    },
};

export const GET = async (request: NextRequest) => {
    const take = Number(request.nextUrl.searchParams.get('take')) || 10;

    const response = await prisma.bookingServices.findMany({
        select: {
            Bookings: true,
            Services: true,
        },
        take,
    });

    return NextResponse.json(response, { status: 200 });
};
