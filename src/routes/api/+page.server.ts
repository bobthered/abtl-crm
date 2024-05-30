import { prisma } from '$lib/prisma/index.js';

export const actions = {
	searchCustomerDescription: async ({ request }) => {
		const { customerDescription } = <{ customerDescription: string }>(
			Object.fromEntries(await request.formData())
		);
		const customers = await prisma.customer.findMany({ select: { description: true, id: true } });
		const customerPartial = customers.find((obj) =>
			new RegExp(customerDescription.replace(/\?/g, '.').replace(/\*/g, '.*'), 'gi').test(
				obj.description
			)
		);
		if (customerPartial === undefined) return { customer: undefined };
		const customer = await prisma.customer.findUnique({
			where: { id: customerPartial.id },
			include: { contacts: true }
		});
		return { customer };
	},
	searchCustomerNumber: async ({ request }) => {
		const { number } = <{ number: string }>Object.fromEntries(await request.formData());
		const customer = await prisma.customer.findUnique({
			where: { number: +number },
			include: { contacts: true }
		});
		return { customer };
	}
};
