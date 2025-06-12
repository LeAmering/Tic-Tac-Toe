<script>
	import { chosenPlayer, decideVS } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	import { get } from 'svelte/store';

	let currentPlayer = $state('X');
	let board = $state(Array(9).fill(''));
	let winner = $state(null);
	let isDraw = $state(false);
	let scoreX = $state(0);
	let scoreO = $state(0);
	let scoreTies = $state(0);
	let game = $state(null);
	let player2 = $state(null);
	let turn = $state(null);
	let userID = $state(null);

	function generateCode() {
		return Math.random().toString(36).substring(2, 8).toUpperCase();
	}

	onMount(async () => {
		if (typeof window !== 'undefined') {
			const storedPlayer = localStorage.getItem('chosenPlayer');
			const storedGameMode = localStorage.getItem('decideVS');
			if (storedPlayer) chosenPlayer.set(storedPlayer);
			if (storedGameMode) decideVS.set(storedGameMode);
		}

		userID = pb.authStore.model?.id;
		const gameID = localStorage.getItem('gameID');

		if (get(decideVS) === 'online') {
			if (gameID) {
				try {
					let fetchedGame = await pb.collection('games').getOne(gameID);
					if (!fetchedGame.player2 && fetchedGame.player1 !== userID) {
						const updatedGame = await pb.collection('games').update(gameID, {
							player2: userID,
							p1Symbol: fetchedGame.p1Symbol || 'X',
							p2Symbol: fetchedGame.p2Symbol || (fetchedGame.p1Symbol === 'X' ? 'O' : 'X'),
							turn: fetchedGame.p1Symbol === 'X' ? fetchedGame.player1 : userID
						});
						game = updatedGame;
					} else {
						game = fetchedGame;
					}
				} catch (error) {
					console.error('Error fetching game:', error);
					game = await createGame();
				}
			} else {
				game = await createGame();
			}

			if (game?.id) {
				pb.collection('games').subscribe(game.id, (e) => {
					game = { ...e.record };
					if (Array.isArray(game.field)) {
						board.splice(0, board.length, ...game.field);
					} else {
						board = Array(9).fill('');
					}
					currentPlayer = game.turn === game.player1 ? game.p1Symbol : game.p2Symbol;
					winner = null;
					isDraw = false;
					player2 = game.player2;
					checkGameStatus();
				});
			}
		}
		onPageLoad();
	});

	function returnHome() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('chosenPlayer', $chosenPlayer);
		}
		goto('/');
	}

	async function createGame() {
		const newGameData = {
			player1: pb.authStore.model.id,
			player2: null,
			field: Array(9).fill(''),
			status: 'waiting',
			gameCode: generateCode(),
			p1Symbol: $chosenPlayer === 'X' ? 'X' : 'O',
			p2Symbol: $chosenPlayer === 'X' ? 'O' : 'X',
			turn: $chosenPlayer === 'X' ? pb.authStore.model.id : 'Player 2 ID'
		};

		const createdGame = await pb.collection('games').create(newGameData);
		localStorage.setItem('gameID', createdGame.id);
		return createdGame;
	}

	function onPageLoad() {
		if ($decideVS === 'cpu' && $chosenPlayer === 'O') {
			cpuMove();
		}
	}

	async function setValue(index) {
		if (!game || board[index] !== '' || winner || isDraw) return;

		const isOnline = $decideVS === 'online';

		if (isOnline) {
			if (!game.player1 || !game.player2 || game.turn !== userID) return;

			const mySymbol = userID === game.player1 ? game.p1Symbol : game.p2Symbol;
			const updatedField = [...board];
			updatedField[index] = mySymbol;
			const nextTurn = game.turn === game.player1 ? game.player2 : game.player1;

			await pb.collection('games').update(game.id, {
				field: updatedField,
				turn: nextTurn
			});
		} else {
			let boardOld = [...board];
			board[index] = currentPlayer;
			currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
			checkGameStatus();
			board = [...board];

			if ($decideVS === 'cpu' && $chosenPlayer !== currentPlayer && !winner) {
				setTimeout(cpuMove, 400);
			}

			let boardNew = [...board];
			fetch('/checkBoard', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ boardOld, boardNew })
			});
		}
	}

	function cpuMove() {
		const availableMoves = board.reduce((acc, cell, index) => {
			if (cell === '') acc.push(index);
			return acc;
		}, []);

		if (availableMoves.length > 0) {
			const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
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

		if (winner || isDraw) return;

		for (const [a, b, c] of winCombos) {
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				winner = board[a];
				if (winner === 'X') scoreX++;
				else scoreO++;
				setTimeout(() => winMod.showModal(), 100);
				return;
			}
		}

		if (board.every((cell) => cell !== '')) {
			isDraw = true;
			scoreTies++;
			setTimeout(() => drawMod.showModal(), 100);
		}
	}

	function restartGame() {
		setTimeout(async () => {
			if ($decideVS === 'online' && game) {
				await pb.collection('games').update(game.id, {
					field: Array(9).fill(''),
					turn: game.p1Symbol === 'X' ? game.player1 : game.player2,
					status: 'playing'
				});
			} else {
				board = Array(9).fill('');
				currentPlayer = 'X';
				winner = null;
				isDraw = false;

				if ($decideVS === 'cpu' && $chosenPlayer === 'O') {
					cpuMove();
				}
			}
			winMod.close();
			drawMod.close();
		}, 200);
	}
</script>

<main class="flex h-screen flex-col items-center justify-center bg-bgBlue text-gray-100">
	<!-- obere Zeile -->
	{#if $decideVS === 'online' && game?.gameCode}
		<div class="mb-4 text-center">
			<p class="text-sm text-gray-300">Game Code:</p>
			<p class="font-mono text-lg text-yellow-400">{game.gameCode}</p>
		</div>
	{/if}
	{#if $decideVS !== 'online' || ($decideVS === 'online' && game?.player1 && game?.player2)}
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
				class="absolute right-5 top-0 mr-1 mt-1 h-8 w-8 items-center justify-center rounded bg-grayTie text-white shadow-custom-shadowBlue"
				onclick={restartGame}
			>
				<img src="assets/images/SVG/icon-restart.svg" alt="x" class="mx-auto h-4 w-4" />
			</button>
		</div>
		<!-- Ende obere Zeile -->

		<!-- Spielfeld -->

		<div class="grid h-80 w-80 grid-cols-3 gap-2">
			{#each board as cell, index}
				<button
					class="flex h-20 w-20 items-center justify-center rounded bg-lgBlue text-2xl text-black shadow-custom-shadowBlue"
					onclick={() => setValue(index)}
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

		<!-- scores -->
		<div class="mt-1 grid w-80 grid-cols-3 gap-2">
			<div
				class="flex h-12 w-20 flex-col items-center justify-center rounded-lg bg-grBlue text-[8px] text-black shadow-md"
			>
				<p>
					{#if $decideVS === 'player'}
						{#if $chosenPlayer === 'X'}
							X (Player 1)
						{:else}
							X (Player 2)
						{/if}
					{:else if $decideVS === 'online'}
						{#if game?.p1Symbol === 'X'}
							X (P1)
						{:else}
							X (P2)
						{/if}
					{:else if $chosenPlayer === 'X' && $decideVS === 'cpu'}
						X (YOU)
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

			<!-- O Score Box -->
			<div
				class="flex h-12 w-20 flex-col items-center justify-center rounded-lg bg-yellow-500 text-[8px] text-black shadow-md"
			>
				<p>
					{#if $decideVS === 'player'}
						{#if $chosenPlayer === 'O'}
							O (Player 1)
						{:else}
							O (Player 2)
						{/if}
					{:else if $decideVS === 'online'}
						{#if game?.p1Symbol === 'O'}
							O (P1)
						{:else}
							O (P2)
						{/if}
					{:else if $chosenPlayer === 'O' && $decideVS === 'cpu'}
						O (YOU)
					{:else}
						O (CPU)
					{/if}
				</p>
				<p class="text-sm font-bold">{scoreO}</p>
			</div>
		</div>
		<!-- Ende Spielfeld und scores -->
	{:else}
		<div class="mt-8 flex flex-col items-center justify-center space-y-2">
			<h1 class="text-xl font-bold">Waiting for second player...</h1>
			{#if game && game.gameCode}
				<p class="text-lg text-yellow-300">
					Game Code: <span class="font-mono">{game.gameCode}</span>
				</p>
			{:else}
				<p class="text-sm text-gray-400">Loading game code...</p>
			{/if}
		</div>
	{/if}

	<!-- Modals -->
	<!-- win Modal -->

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
			{:else if $decideVS === 'online'}
				{#if (userID === game?.player1 && winner === game?.p1Symbol) || (userID === game?.player2 && winner === game?.p2Symbol)}
					<p class="text-lg font-bold">YOU WON</p>
				{:else}
					<p class="text-lg font-bold">OPPONENT WON</p>
				{/if}
			{:else if $decideVS === 'cpu'}
				{#if winner === $chosenPlayer}
					<p class="text-lg font-bold">YOU WON</p>
				{:else}
					<p class="text-lg font-bold">CPU WON</p>
				{/if}
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

			<div class="flex items-center gap-4">
				<button
					class="flex h-8 w-20 items-center justify-center rounded bg-grayTie text-sm text-black shadow-custom-shadowBlue"
					onclick={returnHome}
				>
					QUIT
				</button>

				<button
					class="flex h-8 w-32 items-center justify-center rounded bg-yellow-500 text-sm text-black shadow-custom-shadowBlue"
					onclick={restartGame}
				>
					NEXT ROUND
				</button>
			</div>
		</div>
	</dialog>

	<!-- draw Modal -->
	<dialog id="drawMod" class="modal fixed inset-0 flex items-center justify-center">
		<div
			class="modal-box box-border flex w-full max-w-full flex-col items-center justify-center space-y-4 p-6"
		>
			<p class="text-lg font-bold">IT'S A DRAW</p>

			<br />

			<div class="flex items-center gap-4">
				<button
					class="flex h-8 w-20 items-center justify-center rounded bg-grayTie text-sm text-black shadow-custom-shadowBlue"
					onclick={returnHome}
				>
					QUIT
				</button>

				<button
					class="flex h-8 w-32 items-center justify-center rounded bg-yellow-500 text-sm text-black shadow-custom-shadowBlue"
					onclick={restartGame}
				>
					NEXT ROUND
				</button>
			</div>
		</div>
	</dialog>
</main>
