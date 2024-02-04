import { prisma } from '@/lib/prisma-client';
import { NextResponse } from 'next/server';

export const GET = async () => {
    const bookings = await prisma.flatBookings.findMany({
        take: 50,
    });

    return NextResponse.json(bookings, { status: 200 });
};
