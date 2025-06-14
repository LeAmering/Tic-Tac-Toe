<script>
	import { loggedIn } from '$lib/stores';
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}
