<script>
	import CrafterSearch from './../components/CrafterSearch.svelte';
	export let data;
	const region = data?.region;
	const crafterSearchData = { region };
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="A list of high-level WoW Crafters!" />
</svelte:head>

<section>
	<CrafterSearch
		data={crafterSearchData}
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
