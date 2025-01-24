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

				winMod.showModal();
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
				class=" shadow-custom-shadowBlue flex h-20 w-20 items-center justify-center rounded bg-lgBlue text-2xl text-black"
				on:click={() => setValue(index)}
				disabled={!!cell || winner}
			>
				{#if cell === 'X'}
					<img src="assets/images/SVG/icon-x.svg" alt="X" class="m-3 h-12 w-12" />
				{:else if cell === 'O'}
					<img src="assets/images/SVG/icon-o.svg" alt="O" class="m-3 h-12 w-12" />
				{/if}
			</button>
		{/each}
	</div>

	<dialog id="winMod" class="modal fixed inset-0 flex items-center justify-center">
		<div class="modal-box box-border w-full max-w-full p-6">
			<h3 class="text-lg font-bold">Hello!</h3>
			<p class="py-4">Click the button below to close</p>
			<div class="modal-action">
				<form method="dialog">
					<!-- if there is a button, it will close the modal -->
					<button class="btn">Close</button>
				</form>
			</div>
		</div>
	</dialog>

	{#if winner}
		<p class="mt-4 text-xl">Player {winner} wins!</p>
	{:else if isDraw}
		<p class="mt-4 text-xl">It's a draw!</p>
	{/if}
</main>
