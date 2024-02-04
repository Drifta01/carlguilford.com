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

export const GET = async (
    request: NextRequest,
    { params }: { params: { id: number } },
) => {
    const id = Number(params.id);

    const response = await prisma.bookingServices.findFirst({
        select: {
            Bookings: true,
            Services: true,
        },
        where: {
            BookingId: id,
        },
    });

    return NextResponse.json(response, { status: 200 });
};
