import { pb } from '$lib/pocketbase.js';
import { chosenPlayer, decideVS } from '$lib/stores'; // Import both stores
import { goto } from '$app/navigation'; // Import goto function

export async function POST({ request }) {
	try {
		const data = await request.json();
		const board = Array(9).fill('');
		let playerX, playerO;
		if (data.vsCPU === true) {
			if (data.p1Symbol === 'X') {
				playerX = data.p1;
				playerO = 'CPU';
			}
		}
	} catch (err) {
		console.error('Error in POST request:', err);
		return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
	}
}
