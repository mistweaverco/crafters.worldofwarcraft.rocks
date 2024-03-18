<script>
	import Header from './Header.svelte';
	import RegionQuestionaire from './../components/RegionQuestionaire.svelte';
	import { isRegionQuestionaireOpen } from './../stores/RegionQuestionaireStore';
	import './styles.css';
	import '$lib/tailwind.css';

	export let data;
	const region = data?.region;
</script>

<div class="app">

	{#if $isRegionQuestionaireOpen && !region}
		<RegionQuestionaire />
	{/if}

	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>There are XXX crafters in our DB, across XXX realms.</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
