export async function POST({ request }) {
	try {
		const { boardOld, boardNew } = await request.json();

		if (boardOld.length !== 9 || boardNew.length !== 9) {
			return new Response(JSON.stringify({ error: 'invalid length' }), { status: 400 });
		}

		let changes = [];
		for (let i = 0; i < 9; i++) {
			if (boardOld[i] !== boardNew[i]) {
				changes.push({ index: i, from: boardOld[i], to: boardNew[i] });
			}
		}

		// Rule 1: Only one move allowed
		if (changes.length !== 1) {
			return new Response(
				JSON.stringify({ error: 'Invalid move: more than one change detected' }),
				{ status: 400 }
			);
		}

		const { from, to } = changes[0];

		// Rule 2: You can't overwrite an existing cell
		if (from !== '' || (to !== 'X' && to !== 'O')) {
			return new Response(JSON.stringify({ error: 'Invalid move: illegal symbol placement' }), {
				status: 400
			});
		}

		// Rule 3: Enforce alternating turns
		const xCountOld = boardOld.filter((v) => v === 'X').length;
		const oCountOld = boardOld.filter((v) => v === 'O').length;

		let expectedPlayer = xCountOld === oCountOld ? 'X' : 'O';

		if (to !== expectedPlayer) {
			return new Response(
				JSON.stringify({ error: `Invalid turn: expected ${expectedPlayer}'s move` }),
				{ status: 400 }
			);
		}

		return new Response(JSON.stringify({ message: 'Move is valid' }), { status: 200 });
	} catch (error) {
		console.error('Validation error:', error);
		return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
	}
}
