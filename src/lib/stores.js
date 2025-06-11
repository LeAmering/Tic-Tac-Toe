import { writable } from 'svelte/store';
import { pb } from '$lib/pocketbase.js';

export let decideVS = writable('');
export let chosenPlayer = writable('X');

export let loggedIn = writable(pb.authStore.isValid);

export function refreshLoggedIn() {
	loggedIn.set(pb.authStore.isValid);
}
