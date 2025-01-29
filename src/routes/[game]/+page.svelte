<script>
	import { chosenPlayer, decideVS } from '$lib/stores'; // Import both stores
	import { goto } from '$app/navigation'; // Import goto function
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

	function returnHome() {
		goto('/'); // Navigates to the homepage
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
					setTimeout(cpuMove, 400);
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
			drawMod.showModal();
			scoreTies++;
		}
	}

	function restartGame() {
		board = Array(9).fill('');
		currentPlayer = 'X';
		winner = null;
		isDraw = false;

		if ($decideVS === 'cpu' && $chosenPlayer === 'O') {
			cpuMove();
		}
	}
</script>

<main class="flex h-screen flex-col items-center justify-center bg-bgBlue text-gray-100">
	<div class="relative mt-1 grid w-80 grid-cols-3 gap-2">
		<img src="assets/images/SVG/logo.svg" alt="x" class="h-12 w-12" />
		<div
			class="flex h-8 w-20 items-center justify-center rounded bg-lgBlue text-[10px] font-bold text-grayTie shadow-custom-shadowBlue"
		>
			{#if currentPlayer === 'X'}
				<svg
					id="icon-x-default"
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
					width="10"
					height="10"
					class="mr-2"
				>
					<path
						d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
						fill="#A8BEC9"
						fill-rule="evenodd"
					/>
				</svg>
			{:else}
				<svg
					id="icon-o-default"
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
					width="10"
					height="10"
					class="mr-2"
				>
					<path
						d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
						fill="#A8BEC9"
					/>
				</svg>
			{/if}
			<span>TURN</span>
		</div>
		<button
			class="absolute right-0 top-0 mr-1 mt-1 h-8 w-8 items-center justify-center rounded bg-grayTie text-white shadow-md"
			on:click={restartGame}
		>
			<img src="assets/images/SVG/icon-restart.svg" alt="x" class="mx-auto h-4 w-4" />
		</button>
	</div>

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
			class="flex h-12 w-20 flex-col items-center justify-center rounded-lg bg-grayTie text-[8px] text-black shadow-md"
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
		<div
			class="modal-box box-border flex w-full max-w-full flex-col items-center justify-center space-y-4 p-6"
		>
			{#if $decideVS === 'player'}
				{#if winner === $chosenPlayer}
					<p class="text-lg font-bold">PLAYER 1 WON</p>
				{:else}
					<p class="text-lg font-bold">PLAYER 2 WON</p>
				{/if}
			{:else if winner === $chosenPlayer}
				<p class="text-lg font-bold">YOU WON</p>
			{:else}
				<p class="text-lg font-bold">CPU WON</p>
			{/if}

			<br />

			<div class="flex items-center gap-2">
				{#if winner === 'X'}
					<img src="assets/images/SVG/icon-x.svg" alt="X" class="m-3 h-12 w-12" />
					<p class="font-bold text-grBlue">TAKES THE ROUND</p>
				{:else if winner === 'O'}
					<img src="assets/images/SVG/icon-o.svg" alt="O" class="m-3 h-12 w-12" />
					<p class="font-bold text-yellow-500">TAKES THE ROUND</p>
				{/if}
			</div>

			<div class="flex gap-4">
				<button
					class="h-8 w-20 items-center justify-center rounded bg-grayTie text-black shadow-custom-shadowBlue"
					on:click={returnHome}
				>
					QUIT
				</button>
				<div class="modal-action">
					<form method="dialog">
						<button
							class="h-8 w-20 items-center justify-center rounded bg-yellow-500 text-black shadow-custom-shadowBlue"
							on:click={restartGame}
						>
							NEXT ROUND
						</button>
					</form>
				</div>
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
