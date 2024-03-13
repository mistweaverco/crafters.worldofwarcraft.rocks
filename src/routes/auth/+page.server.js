export async function load({ params, url }) {
	const query = url.searchParams;
	const name = query.get('name');
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
	const json = await response.json();
	return {
		pokemon: json
	};
}

