<script>
	let activeButton = 'x';

	function navigateToPlayer() {
		window.location.href = '/game';
	}
</script>

<main class="flex h-screen flex-col items-center justify-center bg-bgBlue text-gray-100">
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
					class:bg-gray-500={activeButton === 'x'}
					class:btn-active={activeButton === 'x'}
					on:click={() => (activeButton = activeButton === 'x' ? 'none' : 'x')}
					class:hover:bg-gray-200={activeButton === 'x'}
					class:hover:bg-gray-500={activeButton !== 'x'}
				>
					<img src="assets/images/SVG/icon-x-default.svg" alt="X" class="h-5 w-5" />
				</button>

				<button
					class="btn w-40 bg-bgBlue"
					class:bg-gray-500={activeButton === 'o'}
					class:btn-active={activeButton === 'o'}
					on:click={() => (activeButton = activeButton === 'o' ? 'none' : 'o')}
					class:hover:bg-gray-600={activeButton === 'o'}
					class:hover:bg-gray-400={activeButton !== 'o'}
				>
					<img src="assets/images/SVG/icon-o-default.svg" alt="O" class="h-5 w-5" />
				</button>
			</div>

			<p class="text-center text-xs text-gray-400">REMEMBER: X GOES FIRST</p>
		</div>
	</div>
	<button class="mb-3 w-80 rounded-lg bg-yellow-500 px-6 py-3 font-bold text-gray-900">
		NEW GAME (VS CPU)
	</button>
	<button
		class="w-80 rounded-lg bg-grBlue px-6 py-3 font-bold text-gray-900"
		on:click={navigateToPlayer()}
	>
		NEW GAME (VS PLAYER)
	</button>
</main>
