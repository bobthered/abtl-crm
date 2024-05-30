<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		Button,
		Fieldset,
		Form,
		Icon,
		Input,
		Legend,
		Select,
		Textarea
	} from 'sveltewind/components';
	import { MagnifyingGlass } from 'sveltewind/components/icons';

	// props (external)
	export let data;

	// props (internal)
	let customer: undefined | any = undefined;
	let contactId = '';
	let contactOptions = [{ label: '', value: '' }];
	let customerDescription = '';
	let customerId = '';
	let detail = '';
	let number = '';
	let typeId = '';

	// handlers
	const customerDescriptionChangeHandler = () => {
		customer = data.customers.find((obj) => {
			return new RegExp(customerDescription.replace(/\?/g, '.').replace(/\*/g, '.*'), 'gi').test(
				obj.description
			);
		});
		if (customer !== undefined) {
			contactId = '';
			contactOptions = [
				{ label: '', value: '' },
				...customer.contacts.map(({ id, name }) => ({ label: name, value: id }))
			];
			customerDescription = customer.description;
			customerId = customer.id;
			number = customer.number.toString();
		}
		if (customer === undefined) {
			contactId = '';
			contactOptions = [{ label: '', value: '' }];
			number = '';
		}
	};
	const numberChangeHandler = () => {
		customer = data.customers.find((obj) => obj.number === +number);
		if (customer !== undefined) {
			contactId = '';
			contactOptions = [
				{ label: '', value: '' },
				...customer.contacts
					.map(({ id, name }) => ({ label: name, value: id }))
					.sort((a, b) => a.label.localeCompare(b.label))
			];
			customerDescription = customer.description;
			customerId = customer.id;
		}
		if (customer === undefined) {
			contactId = '';
			contactOptions = [{ label: '', value: '' }];
			customerDescription = '';
			customerId = '';
		}
	};

	// props (dynamic)
	$: disabled = customer === undefined;
	$: typeOptions = [
		{ label: '', value: '' },
		...data.types
			.map(({ id, description }) => ({ label: description, value: id }))
			.sort((a, b) => a.label.localeCompare(b.label))
	];
</script>

<div class="flex flex-grow flex-col overflow-auto p-4">
	<Form
		class="flex-grow items-start"
		disabled={disabled ? 'disabled' : undefined}
		use={[[enhance]]}
	>
		<Input bind:value={customerId} name="customerId" type="hidden" />
		<div class="flex items-end space-x-4">
			<Fieldset legend="Customer Description">
				<Input
					bind:value={customerDescription}
					class="w-[20rem]"
					on:change={customerDescriptionChangeHandler}
				/>
			</Fieldset>
			<Fieldset legend="Customer #">
				<Input
					bind:value={number}
					class="w-[10rem] text-right"
					on:change={numberChangeHandler}
					required="required"
					type="number"
				/>
			</Fieldset>
			<Button class="px-3" type="button">
				<Icon src={MagnifyingGlass} />
			</Button>
		</div>
		<Fieldset legend="Contact">
			<Select
				bind:value={contactId}
				name="contactId"
				options={contactOptions}
				required="required"
			/>
		</Fieldset>
		<Fieldset legend="Type">
			<Select bind:value={typeId} name="typeId" options={typeOptions} required="required" />
		</Fieldset>
		<div class="flex w-full flex-grow flex-col space-y-1">
			<Legend>Detail</Legend>
			<Textarea bind:value={detail} class="flex-grow resize-none" name="detail" required="required"
			></Textarea>
		</div>
		<Button class="self-end" disabled={disabled ? 'disabled' : undefined} type="submit">
			Submit
		</Button>
	</Form>
</div>
