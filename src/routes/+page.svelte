<script>
	import { chosenPlayer, decideVS } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Login from '$lib/components/login.svelte';
	import { pb } from '$lib/pocketbase.js';
	import { navigate } from 'svelte-routing';
	import { loggedIn, refreshLoggedIn } from '$lib/stores.js';

	let activeButton = $state('X');
	let activeGameMode = $state('player');
	let gameCode = $state('');
	let gameCodeInput = $state('');

	onMount(() => {
		if (typeof window !== 'undefined') {
			const storedPlayer = localStorage.getItem('chosenPlayer');
			if (storedPlayer) {
				activeButton = storedPlayer;
				chosenPlayer.set(storedPlayer);
			}
		}
	});

	function choosePlayer(button) {
		activeButton = button;
		chosenPlayer.set(activeButton);
		if (typeof window !== 'undefined') {
			localStorage.setItem('chosenPlayer', activeButton);
		}
		console.log('Chosen Player:', $chosenPlayer);
	}

	function navigateToPlayer() {
		decideVS.set('player');
		if (typeof window !== 'undefined') {
			localStorage.setItem('decideVS', 'player');
		}
		goto('/game');
	}

	function navigateToPlayervsCpu() {
		decideVS.set('cpu');
		if (typeof window !== 'undefined') {
			localStorage.setItem('decideVS', 'cpu');
		}
		goto('/game');
	}

	function navigateToOnlinePlayer() {
		decideVS.set('online');
		if (typeof window !== 'undefined') {
			localStorage.setItem('decideVS', 'online');
		}

		goto('/game');
	}

	async function createCode() {
		// const gameCode = Math.random().toString(36).substring(2, 8);
		// localStorage.setItem('gameCode', gameCode);
		decideVS.set('online');
		localStorage.setItem('decideVS', 'online');

		goto('/game');
	}

	async function joinGame() {
		if (gameCodeInput.trim() === '') {
			alert('Please enter a game code.');
			return;
		}

		// try {
		const record = await pb.collection('games').getFirstListItem(`gameCode="${gameCodeInput}"`);

		if (record.player2) {
			alert('This game already has a second player.');
			return;
		}

		await pb.collection('games').update(record.id, {
			player2: pb.authStore.model.id,
			status: 'active'
		});
		localStorage.setItem('gameID', record.id);

		decideVS.set('online');
		localStorage.setItem('decideVS', 'online');
		goto('/game');

		navigateToOnlinePlayer();
	}

	async function logout() {
		pb.authStore.clear();
		refreshLoggedIn();
		location.reload();
	}
</script>

<main class="flex h-screen flex-col items-center justify-center bg-bgBlue text-gray-100">
	{#if pb.authStore.isValid}
		<div class="flex justify-end p-4">
			<button
				class=" rounded-md bg-bgBlue p-4 px-4 py-2 text-gray-100 shadow-md hover:bg-grBlue/90"
				onclick={logout}
			>
				Logout
			</button>
		</div>
		<div class="mb-8 flex items-center gap-2">
			<img src="assets/images/SVG/icon-x.svg" alt="x" class="m-3 h-12 w-12" />
			<img src="assets/images/SVG/icon-o.svg" alt="o" class="m-3 h-12 w-12" />
		</div>

		<div class="mb-6 w-96 rounded-lg bg-lgBlue p-6 shadow-lg">
			<p class="mb-4 text-center text-sm font-bold text-white">PICK PLAYER 1’S MARK</p>
			<div class="flex w-full flex-col items-center rounded-lg bg-lgBlue">
				<div class="btn-group mb-4 flex w-80 rounded-lg bg-bgBlue">
					<button
						class="btn w-40 bg-bgBlue"
						class:bg-gray-400={activeButton === 'X'}
						class:btn-active={activeButton === 'X'}
						onclick={() => choosePlayer('X')}
					>
						<img src="assets/images/SVG/icon-x-default.svg" alt="X" class="h-5 w-5" />
					</button>

					<button
						class="btn w-40 bg-bgBlue"
						class:bg-gray-400={activeButton === 'O'}
						class:btn-active={activeButton === 'O'}
						onclick={() => choosePlayer('O')}
					>
						<img src="assets/images/SVG/icon-o-default.svg" alt="O" class="h-5 w-5" />
					</button>
				</div>

				<p class="text-center text-xs text-gray-400">REMEMBER: X GOES FIRST</p>
			</div>
		</div>

		<button
			class="mb-3 w-80 rounded-lg bg-yellow-500 px-6 py-3 font-bold text-gray-900"
			onclick={navigateToPlayervsCpu}
		>
			NEW GAME (VS CPU)
		</button>
		<button
			class="mb-3 w-80 rounded-lg bg-grBlue px-6 py-3 font-bold text-gray-900"
			onclick={navigateToPlayer}
		>
			NEW GAME (VS LOCAL PLAYER)
		</button>
		<button
			class=" w-80 rounded-lg bg-yellow-500 px-6 py-3 font-bold text-gray-900"
			onclick={choose_game_id.showModal()}
		>
			NEW GAME (VS ONLINE PLAYER)
		</button>
	{:else}
		<Login></Login>
	{/if}

	<dialog id="choose_game_id" class="modal">
		<div class="modal-box">
			<button class="btn btn-primary" onclick={createCode}>Create Game</button>
			<input
				type="text"
				placeholder="Enter game Code"
				class="text-gray-900"
				bind:value={gameCodeInput}
			/>
			<button class="btn btn-primary" onclick={joinGame}>Join Game</button>
			<div class="modal-action">
				<form method="dialog">
					<button class="btn">Close</button>
				</form>
			</div>
		</div>
	</dialog>
</main>
