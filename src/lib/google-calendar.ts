'use server';
import { Prisma } from '@prisma/client';
import { promises as fs } from 'fs';
import { calendar_v3 } from 'googleapis';
import { join } from 'path';
import { prisma } from './prisma-client';
import Schema$Event = calendar_v3.Schema$Event;

export const createDbEntries = async (numEntries: number = 100) => {
    console.log('Creating db entries');

    const filePath = join(process.cwd(), 'src/data/events-2022-2023.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const data: Schema$Event[] = JSON.parse(fileContents);

    const filtered = data
        .filter((event) => filterEvents(event))
        .slice(0, numEntries);

    for (const event of filtered) {
        const bookingDTO: Prisma.FlatBookingsCreateInput = {};

        const bookings = await getBookingServices(event.id!);

        bookingDTO.BookingDate = new Date(event.start?.dateTime!).toISOString();
        bookingDTO.StartDate = new Date(event.start?.dateTime!).toISOString();
        bookingDTO.EndDate = new Date(event.end?.dateTime!).toISOString();
        bookingDTO.Description = event.description;
        bookingDTO.Summary = event.summary;

        if (bookings.length > 0) {
            bookings.forEach((booking) => {
                bookingDTO.BookingId = booking.Bookings.BookingId;
                bookingDTO.BookedOnline = true;
                bookingDTO.CustomerId = booking.Bookings.Customers.CustomerId;
                bookingDTO.DateBooked = booking.Bookings.DateBooked;
                bookingDTO.Email = booking.Bookings.Customers.Email;
                bookingDTO.FirstName = booking.Bookings.Customers.FirstName;
                bookingDTO.LastName = booking.Bookings.Customers.LastName;
                bookingDTO.EventId = booking.Bookings.EventId;
                bookingDTO.Mobile = booking.Bookings.Customers.Phone;
                bookingDTO.Name = booking.Services.Name;
                bookingDTO.ServicePrice = booking.Services.ServicePrice;
                bookingDTO.ServiceId = booking.Services.ServiceId;
                bookingDTO.ServiceTime = booking.Services.ServiceTime;
            });
        } else {
            const start = new Date(event.start?.dateTime!).getTime();
            const end = new Date(event.end?.dateTime!).getTime();
            const timeDiff = (end - start) / 60 / 1000;

            bookingDTO.BookedOnline = !event.creator?.self!;
            bookingDTO.Description = event.summary;
            bookingDTO.EventId = event.id;
            bookingDTO.ServiceTime = Math.round(timeDiff);
            bookingDTO.Name = event.summary;
        }

        await addFlatBooking(bookingDTO);
    }

    console.log('Finished creating db entries');
};

const getBookingServices = async (id: string) => {
    const bookings = await prisma.bookingServices.findMany({
        include: {
            Services: {},
            Bookings: {
                include: {
                    Customers: {},
                },
            },
        },
        where: {
            Bookings: {
                EventId: id,
            },
        },
    });

    return bookings;
};

const addFlatBooking = async (booking: Prisma.FlatBookingsCreateInput) => {
    const flatBooking = await prisma.flatBookings.create({
        data: {
            BookingId: booking.BookingId!,
            BookedOnline: booking.BookedOnline!,
            BookingDate: booking.BookingDate!,
            CustomerId: booking.CustomerId!,
            DateBooked: booking.DateBooked!,
            Description: booking.Description!,
            Email: booking.Email!,
            FirstName: booking.FirstName!,
            LastName: booking.LastName!,
            EventId: booking.EventId!,
            Mobile: booking.Mobile!,
            Name: booking.Name!,
            ServicePrice: booking.ServicePrice!,
            ServiceId: booking.ServiceId!,
            ServiceTime: booking.ServiceTime!,
            StartDate: booking.StartDate!,
            EndDate: booking.EndDate!,
            Summary: booking.Summary,
        },
    });

    return flatBooking;
};

const filterEvents = (event: Schema$Event) => {
    return !(
        event?.summary?.toLowerCase().includes('mikel') ||
        event?.summary?.toLowerCase() === 'm' ||
        event?.summary?.toLowerCase().includes('bank') ||
        event?.summary?.toLowerCase().includes('dentist') ||
        event?.summary?.toLowerCase().includes('lulu') ||
        event?.summary?.toLowerCase() === 'Dr' ||
        event?.summary?.toLowerCase().includes('phone bill') ||
        event?.summary?.toLowerCase().includes('school') ||
        event?.summary?.toLowerCase().includes('mixer') ||
        event?.summary?.toLowerCase().includes('harlow') ||
        event?.summary?.toLowerCase().includes('Mikek') ||
        event?.summary?.toLowerCase().includes('aaron guil')
    );
};
