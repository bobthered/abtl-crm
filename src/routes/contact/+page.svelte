<script lang="ts">
	import { Button, Fieldset, Form, Input } from 'sveltewind/components';
	import { forms } from '$lib/stores';
	import { applyAction, deserialize, enhance } from '$app/forms';

	// handlers
	const customerDescriptionChangeHandler = async () => {
		$forms.loading = true;
		const formData = new FormData();
		formData.append('customerDescription', $forms.interaction.customerDescription);
		const response = await fetch('/api?/searchCustomerDescription', {
			method: 'POST',
			body: formData
		});
		const {
			data: { customer }
		} = deserialize(await response.text());
		if (customer !== undefined) {
			$forms.interaction.contactId = '';
			$forms.interaction.contactOptions = [
				{ label: '', value: '' },
				...customer.contacts.map(({ id, name }) => ({ label: name, value: id }))
			];
			$forms.interaction.customerDescription = customer.description;
			$forms.interaction.customerId = customer.id;
			$forms.interaction.number = customer.number.toString();
		}
		if (customer === undefined) {
			$forms.interaction.contactId = '';
			$forms.interaction.contactOptions = [{ label: '', value: '' }];
			$forms.interaction.customerId = '';
			$forms.interaction.number = '';
		}
		$forms.loading = false;
	};
	const enhanceHandler = () => {
		return async ({ result }) => {
			forms.reset();
			await applyAction(result);
		};
	};
	const numberChangeHandler = async () => {
		$forms.loading = true;
		const formData = new FormData();
		formData.append('number', $forms.interaction.number);
		const response = await fetch('/api?/searchCustomerNumber', {
			method: 'POST',
			body: formData
		});
		const {
			data: { customer }
		} = deserialize(await response.text());
		if (customer !== undefined && customer !== null) {
			$forms.interaction.contactId = '';
			$forms.interaction.contactOptions = [
				{ label: '', value: '' },
				...(customer?.contacts || [])
					.map(({ id, name }) => ({ label: name, value: id }))
					.sort((a, b) => a.label.localeCompare(b.label))
			];
			$forms.interaction.customerDescription = customer.description;
			$forms.interaction.customerId = customer.id;
		}
		if (customer === undefined || customer === null) {
			$forms.interaction.contactId = '';
			$forms.interaction.contactOptions = [{ label: '', value: '' }];
			$forms.interaction.customerDescription = '';
			$forms.interaction.customerId = '';
		}
		$forms.loading = false;
	};

	// props (dynamic)
	$: disabled = $forms.interaction.customerId === '';
</script>

<div class="flex flex-grow flex-col overflow-auto p-4">
	<Form
		class="flex-grow items-start"
		disabled={disabled ? 'disabled' : undefined}
		use={[[enhance, enhanceHandler]]}
	>
		<Input bind:value={$forms.interaction.customerId} name="customerId" type="hidden" />
		<div class="flex items-end space-x-4">
			<Fieldset legend="Customer Description">
				<Input
					bind:value={$forms.interaction.customerDescription}
					class="w-[20rem]"
					on:change={customerDescriptionChangeHandler}
				/>
			</Fieldset>
			<Fieldset legend="Customer #">
				<Input
					bind:value={$forms.interaction.number}
					class="w-[10rem] text-right"
					on:change={numberChangeHandler}
					required="required"
					type="number"
				/>
			</Fieldset>
		</div>
		<Fieldset legend="Email">
			<Input bind:value={$forms.contact.email} name="email" type="email" />
		</Fieldset>
		<Fieldset legend="Name">
			<Input bind:value={$forms.contact.name} name="name" required="required" />
		</Fieldset>
		<Fieldset legend="Phone">
			<Input bind:value={$forms.contact.phone} name="phone" type="number" />
		</Fieldset>
		<Fieldset legend="Extension">
			<Input bind:value={$forms.contact.phoneExtension} name="phoneExtension" type="number" />
		</Fieldset>
		<div class="flex w-full flex-grow items-end justify-end">
			<Button class="self-end" disabled={disabled ? 'disabled' : undefined} type="submit">
				Submit
			</Button>
		</div>
	</Form>
</div>
