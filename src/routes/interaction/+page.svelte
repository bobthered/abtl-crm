<script lang="ts">
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
	import { Plus } from 'sveltewind/components/icons';
	import { theme } from 'sveltewind/stores';
	import { twMerge } from 'tailwind-merge';
	import { applyAction, deserialize, enhance } from '$app/forms';
	import { forms } from '$lib/stores';

	// props (external)
	export let data;

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
				...customer.contacts
					.map(({ id, name }) => ({ label: name, value: id }))
					.sort((a, b) => a.label.localeCompare(b.label))
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
			<!-- <Button class="px-3" type="button">
				<Icon src={MagnifyingGlass} />
			</Button> -->
		</div>
		<div class="flex items-end space-x-4">
			<Fieldset legend="Contact">
				<Select
					bind:value={$forms.interaction.contactId}
					name="contactId"
					options={$forms.interaction.contactOptions}
					required="required"
				/>
			</Fieldset>
			<a class={twMerge($theme.button, 'px-3')} href="/contact" tabindex="-1">
				<Icon src={Plus} />
			</a>
		</div>
		<Fieldset legend="Type">
			<Select
				bind:value={$forms.interaction.typeId}
				name="typeId"
				options={typeOptions}
				required="required"
			/>
		</Fieldset>
		<div class="flex w-full flex-grow flex-col space-y-1">
			<Legend>Detail</Legend>
			<Textarea
				bind:value={$forms.interaction.detail}
				class="flex-grow resize-none"
				name="detail"
				required="required"
			></Textarea>
		</div>
		<Button class="self-end" disabled={disabled ? 'disabled' : undefined} type="submit">
			Submit
		</Button>
	</Form>
</div>
