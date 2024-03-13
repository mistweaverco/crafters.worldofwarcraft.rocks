<script>
	import { goto } from '$app/navigation';
	export let data;
	localStorage.setItem('token', data.token);
	localStorage.setItem('token_expires_in', data.expires_in);
	goto('/');
</script>

