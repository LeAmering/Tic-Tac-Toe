<script>
	import { chosenPlayer, decideVS } from '$lib/stores'; // Import both stores
	import { onMount } from 'svelte';
	let currentPlayer = 'X';
	let board = Array(9).fill('');
	let winner = null;
	let isDraw = false;
	let scoreX = 0;
	let scoreO = 0;
	let scoreTies = 0;

	onMount(() => {
		onPageLoad();
		console.log('Game Mode:', $decideVS);
		console.log('Chosen Player:', $chosenPlayer);
	});

	$: {
		if (typeof window !== 'undefined') {
			const storedPlayer = localStorage.getItem('chosenPlayer');
			const storedGameMode = localStorage.getItem('decideVS');

			if (storedPlayer) {
				chosenPlayer.set(storedPlayer);
			}
			if (storedGameMode) {
				decideVS.set(storedGameMode);
			}
		}
	}

	function onPageLoad() {
		if ($decideVS === 'cpu' && $chosenPlayer === 'O') {
			cpuMove();
			console.log('CPU Move');
		}
	}

	function setValue(index) {
		if (board[index] === '' && !winner) {
			if ($decideVS === 'player' || currentPlayer === $chosenPlayer) {
				board[index] = currentPlayer;
				currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
				checkGameStatus();
				board = [...board];

				if ($decideVS === 'cpu' && $chosenPlayer !== currentPlayer && !winner) {
					setTimeout(cpuMove, 100);
				}
			}
		}
	}
	function cpuMove() {
		const availableMoves = board.reduce((acc, cell, index) => {
			if (cell === '') {
				acc.push(index);
			}
			return acc;
		}, []);

		if (availableMoves.length > 0) {
			const randomIndex = Math.floor(Math.random() * availableMoves.length);
			const randomMove = availableMoves[randomIndex];
			board[randomMove] = currentPlayer;
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

		for (const combo of winCombos) {
			const [a, b, c] = combo;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				winner = board[a];
				if (winner === 'X') {
					scoreX++;
				} else {
					scoreO++;
				}
				winMod.showModal();
				return;
			}
		}

		if (board.every((cell) => cell !== '')) {
			isDraw = true;
			scoreTies++;
		}
	}

	function restartGame() {
		board = Array(9).fill('');
		currentPlayer = $chosenPlayer;
		winner = null;
		isDraw = false;

		if ($decideVS === 'cpu' && $chosenPlayer === 'o') {
			cpuMove();
		}
	}
</script>

<main class="flex h-screen flex-col items-center justify-center bg-bgBlue text-gray-100">
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
				class="flex h-20 w-20 items-center justify-center rounded bg-lgBlue text-2xl text-black shadow-custom-shadowBlue"
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

	<div class="mt-1 grid w-80 grid-cols-3 gap-2">
		<div
			class="flex h-12 w-20 flex-col items-center justify-center rounded-lg bg-grBlue text-[8px] text-black shadow-md"
		>
			<p>
				{#if $chosenPlayer === 'X'}
					X (YOU)
					{#if $decideVS === 'player'}
						<br />X (Player 2)
					{/if}
				{:else}
					X (CPU)
				{/if}
			</p>
			<p class="text-sm font-bold">{scoreX}</p>
		</div>

		<div
			class="bg-grayTie flex h-12 w-20 flex-col items-center justify-center rounded-lg text-[8px] text-black shadow-md"
		>
			<p>TIES</p>
			<p class="text-sm font-bold">{scoreTies}</p>
		</div>

		<div
			class="flex h-12 w-20 flex-col items-center justify-center rounded-lg bg-yellow-500 text-[8px] text-black shadow-md"
		>
			<p>
				{#if $chosenPlayer === 'O'}
					O (YOU)
					{#if $decideVS === 'player'}
						<br />O (Player 2)
					{/if}
				{:else}
					O (CPU)
				{/if}
			</p>
			<p class="text-sm font-bold">{scoreO}</p>
		</div>
	</div>

	<dialog id="winMod" class="modal fixed inset-0 flex items-center justify-center">
		<div class="modal-box box-border flex w-full max-w-full items-center justify-center p-6">
			<p>YOU WON!</p>
			<br />
			{#if winner === 'X'}
				<img src="assets/images/SVG/icon-x.svg" alt="X" class="m-3 h-12 w-12" />
			{:else if winner === 'O'}
				<img src="assets/images/SVG/icon-o.svg" alt="O" class="m-3 h-12 w-12" />
			{/if}
			<p>takes the round</p>
			<br />
			<div class="modal-action">
				<form method="dialog">
					<button class="btn">Close</button>
				</form>
			</div>
		</div>
	</dialog>

	<dialog id="drawMod" class="modal fixed inset-0 flex items-center justify-center">
		<div class="modal-box box-border flex w-full max-w-full items-center justify-center p-6">
			<p>IT'S A DRAW!</p>
			<br />
			<div class="modal-action">
				<form method="dialog">
					<button class="btn">Close</button>
				</form>
			</div>
		</div>
	</dialog>
</main>
