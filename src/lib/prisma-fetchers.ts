import { prisma } from './prisma-client';

export const getFlatBookings = async (take: number = 10) => {
    return await prisma.flatBookings.findMany({
        orderBy: {
            Id: 'asc',
        },
        take: take === 0 ? undefined : take,
    });
};
