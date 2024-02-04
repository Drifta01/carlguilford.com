// import { Prisma } from '@prisma/client';
// import { promises as fs } from 'fs';
// import { calendar_v3 } from 'googleapis';
// import { join } from 'path';
// import { expect, test } from 'vitest';
// import { prisma } from './prisma-client';
// import { createEvent, getEvents, getGoogleAuth } from './google-calendar';
// import Schema$Event = calendar_v3.Schema$Event;

// const calendarId =
//     '768d3fc3f7fa029e818269af11a59e1db7a724722a807f3b5e04a6430478d275@group.calendar.google.com';

// const getBookingServices = async (id: string) => {
//     const bookings = await prisma.bookingServices.findMany({
//         include: {
//             Services: {},
//             Bookings: {
//                 include: {
//                     Customers: {},
//                 },
//             },
//         },
//         where: {
//             Bookings: {
//                 EventId: id,
//             },
//         },
//     });

//     return bookings;
// };

// const addFlatBooking = async (booking: Prisma.FlatBookingsCreateInput) => {
//     const flatBooking = await prisma.flatBookings.create({
//         data: {
//             BookingId: booking.BookingId!,
//             BookedOnline: booking.BookedOnline!,
//             BookingDate: booking.BookingDate!,
//             CustomerId: booking.CustomerId!,
//             DateBooked: booking.DateBooked!,
//             Description: booking.Description!,
//             Email: booking.Email!,
//             FirstName: booking.FirstName!,
//             LastName: booking.LastName!,
//             EventId: booking.EventId!,
//             Mobile: booking.Mobile!,
//             Name: booking.Name!,
//             ServicePrice: booking.ServicePrice!,
//             ServiceId: booking.ServiceId!,
//             ServiceTime: booking.ServiceTime!,
//             StartDate: booking.StartDate!,
//             EndDate: booking.EndDate!,
//             Summary: booking.Summary,
//         },
//     });

//     return flatBooking;
// };

// const filterEvents = (event: Schema$Event) => {
//     return !(
//         event?.summary?.toLowerCase().includes('mikel') ||
//         event?.summary?.toLowerCase() === 'm' ||
//         event?.summary?.toLowerCase().includes('bank') ||
//         event?.summary?.toLowerCase().includes('dentist') ||
//         event?.summary?.toLowerCase().includes('lulu') ||
//         event?.summary?.toLowerCase() === 'Dr' ||
//         event?.summary?.toLowerCase().includes('phone bill') ||
//         event?.summary?.toLowerCase().includes('school') ||
//         event?.summary?.toLowerCase().includes('mixer') ||
//         event?.summary?.toLowerCase().includes('harlow') ||
//         event?.summary?.toLowerCase().includes('Mikek') ||
//         event?.summary?.toLowerCase().includes('aaron guil')
//     );
// };

// const getFlatBookings = async () => {
//     return await prisma.flatBookings.findMany({
//         orderBy: {
//             Id: 'asc',
//         },
//         take: 10,
//     });
// };

// test('create events', async () => {
//     const auth = getGoogleAuth();

//     const bookings = await getFlatBookings();

//     bookings.map(async (booking) => {
//         await createEvent({
//             startDate: booking.StartDate!.toISOString(),
//             endDate: booking.EndDate!.toISOString(),

//             calendarId,
//             summary: booking.Summary!,
//             description: booking.Description!,
//         });
//     });
// });

// // test('get events', async () => {
// //     const auth = getGoogleAuth();
// //
// //     const result = await getEvents({
// //         startDate: new Date('April 7 2021').toISOString(),
// //         endDate: new Date('April 7 2021').toISOString(),
// //         auth,
// //         calendarId,
// //     });
// //
// //     expect(result).toBeDefined();
// // });
// //
// // test('create db entries', async () => {
// //     const filePath = join(process.cwd(), 'src/data/events-2021-2022.json');
// //     const fileContents = await fs.readFile(filePath, 'utf-8');
// //     const data: Schema$Event[] = JSON.parse(fileContents);
// //
// //     const filtered = data.filter((event) => filterEvents(event)).slice(0, 100);
// //
// //     for (const event of filtered) {
// //         const bookingDTO: Prisma.FlatBookingsCreateInput = {};
// //
// //         const bookings = await getBookingServices(event.id!);
// //
// //         bookingDTO.BookingDate = new Date(event.start?.dateTime!).toISOString();
// //         bookingDTO.StartDate = new Date(event.start?.dateTime!).toISOString();
// //         bookingDTO.EndDate = new Date(event.end?.dateTime!).toISOString();
// //         bookingDTO.Summary = event.summary;
// //
// //         console.log(event.start?.dateTime!);
// //
// //         if (bookings.length > 0) {
// //             bookings.forEach((booking) => {
// //                 bookingDTO.BookingId = booking.Bookings.BookingId;
// //                 bookingDTO.BookedOnline = true;
// //                 bookingDTO.CustomerId = booking.Bookings.Customers.CustomerId;
// //                 bookingDTO.DateBooked = booking.Bookings.DateBooked;
// //                 bookingDTO.Description = booking.Services.Description;
// //                 bookingDTO.Email = booking.Bookings.Customers.Email;
// //                 bookingDTO.FirstName = booking.Bookings.Customers.FirstName;
// //                 bookingDTO.LastName = booking.Bookings.Customers.LastName;
// //                 bookingDTO.EventId = booking.Bookings.EventId;
// //                 bookingDTO.Mobile = booking.Bookings.Customers.Phone;
// //                 bookingDTO.Name = booking.Services.Name;
// //                 bookingDTO.ServicePrice = booking.Services.ServicePrice;
// //                 bookingDTO.ServiceId = booking.Services.ServiceId;
// //                 bookingDTO.ServiceTime = booking.Services.ServiceTime;
// //             });
// //         } else {
// //             const start = new Date(event.start?.dateTime!).getTime();
// //             const end = new Date(event.end?.dateTime!).getTime();
// //             const timeDiff = (end - start) / 60 / 1000;
// //
// //             bookingDTO.BookedOnline = !event.creator?.self!;
// //             bookingDTO.Description = event.summary;
// //             bookingDTO.EventId = event.id;
// //             bookingDTO.ServiceTime = Math.round(timeDiff);
// //             bookingDTO.Name = event.summary;
// //         }
// //
// //         await addFlatBooking(bookingDTO);
// //     }
// // });
