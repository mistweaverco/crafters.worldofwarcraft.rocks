import {
	getWowAccountProfileSummary,
	getApiToken,
} from '$lib/server/BattleNetApi';

/**
 * @type {import('@sveltejs/kit').Load}
 */
export async function load({ url }) {
	const query = url.searchParams;
	const code = query.get('code') || '';
	const apiTokenResult = await getApiToken(code);

	if ('error' in apiTokenResult) {
		return apiTokenResult;
	}

	// TODO: Get all characters with level 70 and their professions
	//       then filter out the ones with the professions we want
	//       (Alchemy, Jewelcrafting, Enchanting, Tailoring, Leatherworking, Blacksmithing)
	//       then filter out the ones that have the recipes we want (see below)

	// TODO: Find a way to get the recipes we want, probably wowhead or something?!

	// TODO: Get all recipes for the professions we want
	//       This will be difficult to test, because we need to have a character
	//       with the profession and the recipe to test it.
	//       Probably we can ask Mæx@DasKonsortium
	//       (https://worldofwarcraft.blizzard.com/en-gb/character/eu/das-konsortium/M%C3%A6x)
	//       for help with this.

	// TODO: Find a way to get the realm "name", it's not in slug, is it?
	//       that is used for sending crafting orders in game.


	// TODO: Save everything to a database, for later use in the crafting order search

	const accoutProfileSummary = await getWowAccountProfileSummary('eu', apiTokenResult.access_token);
	accoutProfileSummary.wow_accounts.forEach((account) => {
		account.characters.forEach((character) => {
			if (character.level === 70) {
				console.log(`Character: ${character.name} @ ${character.realm.name}`);
			}
		});
	});
	console.log('apiTokenResult', apiTokenResult);
	return apiTokenResult;
}

