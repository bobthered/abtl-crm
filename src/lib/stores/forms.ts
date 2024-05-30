import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = {
	contact: {
		email: '',
		name: '',
		phone: '',
		phoneExtension: ''
	},
	interaction: {
		contactId: '',
		contactOptions: [{ label: '', value: '' }],
		customerDescription: '',
		customerId: '',
		detail: '',
		number: '',
		typeId: ''
	},
	loading: false
};
const initialValue = browser
	? JSON.parse(window.localStorage.getItem('forms') || JSON.stringify(defaultValue))
	: defaultValue;

const { subscribe, set, update } = writable(initialValue);

subscribe((value) => {
	if (browser) {
		localStorage.setItem('forms', JSON.stringify(value));
	}
});

const forms = {
	reset: () => {
		set(structuredClone(defaultValue));
	},
	subscribe,
	set,
	update
};

export { forms };
