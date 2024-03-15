<script>
	import BattleNetButton from './BattleNetButton.svelte';
	export let data;
	const hasAccessTokenCookie = data?.hasAccessTokenCookie;
	const battleNetButtonData = { hasAccessTokenCookie };
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<BattleNetButton
		data={battleNetButtonData}
	/>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
