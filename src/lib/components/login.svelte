<script>
	import { pb } from '$lib/pocketbase.js';

	import { loggedIn, refreshLoggedIn } from '$lib/stores.js';

	let mail = $state('');
	let password = $state('');
	let registration = $state(false);
	let passwordCopy = $state('');

	async function login() {
		const authData = await pb.collection('users').authWithPassword(mail, password);
		refreshLoggedIn();
		location.reload();
	}

	async function createUser() {
		if (password !== passwordCopy) {
			alert('Passwords do not match!');
			return;
		}

		// try {
		await pb.collection('users').create({
			email: mail,
			password: password,
			passwordConfirm: passwordCopy
		});
		await login();
		// } catch (error) {
		// 	alert('Registration failed: ' + error.message);
		// }
	}
</script>

<div class="card-lg card w-96 bg-base-100 shadow-sm">
	<div class="card-body">
		<h2 class="card-title">Login</h2>
		<fieldset class="fieldset">
			<legend class="fieldset-legend">E-Mail</legend>
			<input type="email" class="input" placeholder="type here" bind:value={mail} />
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Password</legend>
			<input type="password" class="input" placeholder="type here" bind:value={password} />
		</fieldset>
		{#if registration}
			<fieldset class="fieldset">
				<legend class="fieldset-legend">Repeat Password</legend>
				<input type="password" class="input" placeholder="type here" bind:value={passwordCopy} />
			</fieldset>
		{/if}
		<div class="card-actions justify-end">
			{#if !registration}
				<button
					class="btn"
					onclick={() => {
						registration = true;
					}}>Register</button
				>

				<button class="btn btn-primary" onclick={login}>Login</button>
			{:else}
				<button class="btn btn-primary" onclick={createUser}>Register</button>
			{/if}
		</div>
	</div>
</div>
