import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = {
	interaction: {
		contactId: '',
		contactOptions: [{ label: '', value: '' }],
		customerDescription: '',
		customerId: '',
		detail: '',
		number: '',
		typeId: ''
	}
};
const initialValue = browser
	? JSON.parse(window.localStorage.getItem('store') || JSON.stringify(defaultValue))
	: defaultValue;

const store = writable(initialValue);

store.subscribe((value) => {
	if (browser) {
		localStorage.setItem('store', JSON.stringify(value));
	}
});

export default store;
