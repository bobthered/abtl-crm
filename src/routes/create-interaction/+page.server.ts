import { DateTime } from 'luxon';
import { prisma } from '$lib/prisma';

export const actions = {
	default: async ({ request }) => {
		const { contactId, customerId, detail, typeId } = <{ [key: string]: string }>(
			Object.fromEntries(await request.formData())
		);
		const date = DateTime.now().toJSDate();
		await prisma.customerInteraction.create({
			data: {
				contactId,
				customerId,
				date,
				detail,
				typeId
			}
		});
		return { success: true };
	}
};
export const load = async () => {
	const [customers, types] = await Promise.all([
		prisma.customer.findMany({
			orderBy: [{ description: 'asc' }],
			select: { id: true, contacts: true, description: true, number: true }
		}),
		prisma.customerInteractionType.findMany({
			orderBy: [{ description: 'asc' }],
			select: { id: true, description: true }
		})
	]);

	return { customers, types };
};
