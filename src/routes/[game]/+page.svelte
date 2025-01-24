<script>
	let currentPlayer = 'X';
	let board = Array(9).fill('');
	let winner = null;
	let isDraw = false;

	function setValue(index) {
		if (board[index] === '' && !winner) {
			board[index] = currentPlayer;
			currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
			checkGameStatus();
		}
	}

	function checkGameStatus() {
		const winCombos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		// Check  winner
		for (const combo of winCombos) {
			const [a, b, c] = combo;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				winner = board[a];
				return;
			}
		}

		// Check  draw
		if (board.every((cell) => cell !== '')) {
			isDraw = true;
		}
	}

	function restartGame() {
		board = Array(9).fill('');
		currentPlayer = 'X';
		winner = null;
		isDraw = false;
	}
</script>

<main class="flex h-screen flex-col items-center justify-center bg-bgBlue text-gray-100">
	<h1 class="mb-4 text-2xl text-white">Tic Tac Toe - Player vs Player</h1>

	<p class="mt-4 text-xl">Current Turn: Player {currentPlayer}</p>

	<button
		class="mt-6 rounded bg-bgBlue px-4 py-2 text-white shadow-md hover:bg-green-600"
		on:click={restartGame}
	>
		Restart Game
	</button>

	<div class="grid h-80 w-80 grid-cols-3 gap-2">
		{#each board as cell, index}
			<button
				class="flex h-20 w-20 items-center justify-center rounded bg-white text-2xl text-black"
				on:click={() => setValue(index)}
				disabled={!!cell || winner}
			>
				{cell}
			</button>
		{/each}
	</div>

	{#if winner}
		<p class="mt-4 text-xl">Player {winner} wins!</p>
	{:else if isDraw}
		<p class="mt-4 text-xl">It's a draw!</p>
	{/if}
</main>
