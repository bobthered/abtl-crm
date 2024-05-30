import { prisma } from '$lib/prisma';

// export const load = async () => {
// 	// create customer interaction types
// 	const customerInteractionTypeDescriptions = ['Email', 'Phone'];
// 	await Promise.all(
// 		customerInteractionTypeDescriptions.map(async (description) => {
// 			await prisma.customerInteractionType.upsert({
// 				where: { description },
// 				create: {
// 					description
// 				},
// 				update: { description }
// 			});
// 		})
// 	);

// 	// create customer statuses
// 	const customerStatusDescriptions = ['Current', 'Dead', 'Stale'];
// 	await Promise.all(
// 		customerStatusDescriptions.map(async (description) => {
// 			await prisma.customerStatus.upsert({
// 				where: { description },
// 				create: {
// 					description
// 				},
// 				update: { description }
// 			});
// 		})
// 	);

// 	// create customer territories
// 	const customerTerritoryDescriptions = ['DIST', 'FIRE', 'HOUSE', 'OS1', 'OS2', 'OS3', 'SHELL'];

// 	await Promise.all(
// 		customerTerritoryDescriptions.map(async (description) => {
// 			await prisma.customerTerritory.upsert({
// 				where: { description },
// 				create: {
// 					description
// 				},
// 				update: { description }
// 			});
// 		})
// 	);
// };
