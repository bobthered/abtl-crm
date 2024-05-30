import { prisma } from '$lib/prisma';

export const actions = {
	default: async ({ request }) => {
		const { customerId, email, name, phone, phoneExtension } = <{ [key: string]: string }>(
			Object.fromEntries(await request.formData())
		);
		await prisma.customerContact.create({
			data: {
				customerId,
				email,
				name,
				phone: +phone,
				phoneExtension: +phoneExtension
			}
		});
		return { success: true };
	}
};
