// import { Prisma, PrismaClient } from '@prisma/client';
// import { mockPlayers } from '../src/mock-data/mock-utils';
// import realPlayers from './players.json';

// const prisma = new PrismaClient();

// const users = mockPlayers(30, true);

// const createMockPlayers = async () => {
//   const players: Prisma.PlayerCreateInput[] = mockPlayers(30, true).map((player) => ({
//     name: player.name,
//   }));

//   await Promise.all(
//     users.map(async (player) => {
//       await prisma.player.create({
//         data: player,
//       });
//     })
//   );
// };

// const createRealPlayers = async () => {
//   await Promise.all(
//     realPlayers.players.map(async (player) => {
//       await prisma.player.create({
//         data: {
//           name: player.name,
//         },
//       });
//     })
//   );
// };

// async function main() {
//   //await createMockPlayers();
//   await createRealPlayers();
// }

// main()
//   .then(() => prisma.$disconnect())
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit();
//   });
