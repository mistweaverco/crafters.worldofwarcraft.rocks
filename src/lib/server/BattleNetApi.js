import {
	BNET_CLIENT_SECRET,
} from '$env/static/private'

import {
	PUBLIC_BNET_CLIENT_ID,
	PUBLIC_REDIRECT_URI
} from '$env/static/public'

import {
	API_LOCALE,
	API_OAUTH_TOKEN_ENDPOINT
} from '$lib/client/BattleNetApi'

/**
 * @typedef {import('$lib/types/BattleNetApi').WowRegion} WowRegion
 */

/**
 * Get the base uri for the api
 * @param {WowRegion} region - The region to get the base uri for
 * @returns {string} - The base uri for the api
 */
function getApiBaseUri(region) {
	return `https://${region}.api.blizzard.com`;
}

/**
 * Get the namespace for the api
 * @param {WowRegion} region - The region to get the namespace for
 * @param {"static" | "dynamic" | "profile"} type - The type to get the namespace for
 * @returns {string} - The namespace (a string like "static-eu" or "dynamic-eu").
 */
function getApiNamespace(region, type) {
	return `${type}-${region}`;
}

/**
 * Get the auth string for the api
 * @returns {string} - The auth string for the api
 */
function getAuthString() {
	return `${PUBLIC_BNET_CLIENT_ID}:${BNET_CLIENT_SECRET}`;
}

/**
 * Get the json from a remote url
 * @param {string} url - The url to get the json from
 * @param {RequestInit} [options] - The options for the request
 * @returns {Promise<any>} - The promise of the fetch request
 */
async function getRemoteJson(url, options) {
	options = options || {};
	options.method = options.method || 'GET';
	options.headers = options.headers || {};
	options.headers['Content-Type'] = 'application/json';
	let result = null;
	let jsonResult = { error: 'no result' };
	try {
		result = await fetch(url, options);
		try {
			jsonResult = await result.json();
		} catch (e) {
			console.error('error', e);
		}
	}
	catch (e) {
		console.error('error', e);
	}
	return jsonResult;
}

/**
 * Filter the characters by the maximum level
 * @param {Array<WowCharactersResponse>} characters - The characters to filter
 * @returns {Array<WowCharactersResponse>} - The filtered characters
 * @description This function should filter the characters by the maximum level
 */
export function filterMaxLevelCharacters(characters) {
	return characters.filter((character) => character.level === 70);
}

/**
* @typedef {Object} ApiTokenSuccessResponse
* @property {string} token_type - The token type.
* @property {string} access_token - The token.
* @property {number} expires_in - The token expiration time.
*/

/**
* @typedef {Object} ApiTokenErrorResponse
* @property {string} error - The error.
*/

/**
 * Get the token from the code
 * @param {string} code - The code to use to get the token
 * @returns {Promise<ApiTokenSuccessResponse|ApiTokenErrorResponse>} - The promise of the fetch request
 */
export async function getApiToken(code) {
	const apiEndpoint = `${API_OAUTH_TOKEN_ENDPOINT}?grant_type=authorization_code&code=${code}&redirect_uri=${PUBLIC_REDIRECT_URI}`
	const result = await getRemoteJson(apiEndpoint, {
		method: 'POST',
		headers: {
			'Authorization': `Basic ${btoa(getAuthString())}`,
		},
		credentials: 'include',
	});
	return result;
}

/**
 * @typedef {Object} WowRealmResponse
 * @property {number} id - The realm id.
 * @property {string} name - The realm name.
 * @property {string} category - German, French, English, etc.
 * @property {string} locale - The realm locale (enGB, deDE, frFR, etc).
 * @property {string} timezone - The realm timezone (Europe/Paris, etc).
 * @property {object} type - The realm type (pvp, pve, rp, rppvp).
 * @property {"RP" | "PVP" | "PVE"} type.type - The realm type.
 * @property {"Roleplaying" | "Player Versus Player" | "Player Versus Environment"} type.name - The name of the realm type.
 */

/**
 * @typedef {Object} WowConnectedRealmResponse
 * @property {number} id - The connected realm id.
 * @property {object} status - The connected realm status.
 * @property {"UP" | "DOWN"} status.type - The connected realm status type.
 * @property {"Up" | "Down"} status.name - The connected realm status name.
 * @property {object} population - The connected realm population.
 * @property {"HIGH" | "MEDIUM" | "LOW"} population.type - The connected realm population type.
 * @property {"High" | "Medium" | "Low"} population.name - The connected realm population name.
 * @property {Array<WowRealmResponse>} realms - The connected realm realms.
 */

/**
 * Get the connected realms
 * @param {WowRegion} region - The region to get the connected realms from
 * @param {number} realmId - The realm id to get the connected realms from
 * @param {string} token - The token to use for the request
 * @returns {Promise<WowConnectedRealmResponse>} - The promise of the fetch request
 */
export async function getWowConnectedRealmsByRealmId(region, realmId, token) {
	const apiBaseUri = getApiBaseUri(region);
	const ns = getApiNamespace(region, 'dynamic');
	const apiEndpoint = `${apiBaseUri}/data/wow/connected-realm/${realmId}?namespace=${ns}&locale=${API_LOCALE}&access_token=${token}`
	const result = await getRemoteJson(apiEndpoint);
	return result;
};

/**
 * @typedef {Object} WowRealmsIndexRealmsItem
 * @property {number} id - The realm id.
 * @property {string} name - The realm name.
 * @property {string} slug - The realm slug.
 * @property {object} key - The realm key object.
 * @property {string} key.href - The realm href.
 */

/**
 * @typedef {Object} WowRealmsIndexResponse
 * @property {Array<WowRealmsIndexRealmsItem>} realms - The available realms in this region.
 */

/**
 * Get the realms index
 * @param {WowRegion} region - The region to get the connected realms from
 * @param {string} token - The token to use for the request
 * @returns {Promise<WowRealmsIndexResponse>} - The promise of the fetch request
 */
export async function getWowRealmsIndex(region, token) {
	const apiBaseUri = getApiBaseUri(region);
	const ns = getApiNamespace(region, 'dynamic');
	const apiEndpoint = `${apiBaseUri}/data/wow/realm/index?namespace=${ns}&locale=${API_LOCALE}&access_token=${token}`
	const result = await getRemoteJson(apiEndpoint);
	return result;
};

/**
 * @typedef {Object} WowRealmIndexRealmsItem
 * @property {number} id - The realm id.
 * @property {string} name - The realm name.
 * @property {string} slug - The realm slug.
 * @property {string} key.href - The realm href.
 */

/**
 * @typedef {Object} WowRealmIndexResponse
 * @property {Array<WowRealmIndexRealmsItem>} realms - The available realms in this region.
 */

/**
 * Get the realm by href
 * @param {string} href - The href to get the realm from
 * @param {string} token - The token to use for the request
 * @returns {Promise<WowRealmIndexResponse>} - The promise of the fetch request
 */
export async function getWowRealmByHref(href, token) {
	const result = await getRemoteJson(`${href}&access_token=${token}`);
	return result;
};

/**
* @typedef {Object} WowCharactersRealmResponse
* @property {number} id - The realm id.
* @property {string} name - The realm name.
* @property {string} slug - The realm slug.
*/

/**
* @typedef {Object} WowCharactersResponse
* @property {string} name - The character name.
* @property {number} level - The character level.
* @property {WowCharactersRealmResponse} realm - The character realm.
*/

/**
* @typedef {Object} WowAccountsResponse
* @property {string} id - The wow account id.
* @property {Array<WowCharactersResponse>} characters - The associated wow characters.
*/

/**
* @typedef {Object} WowAccountProfileSummaryResponse
* @property {string} id - The account id.
* @property {Array<WowAccountsResponse>} wow_accounts - The associated wow accounts.
*/

/**
 * Get the account profile getAccountProfileSummary
 * @param {WowRegion} region - The region to get the profile from
 * @param {string} token - The token to use for the request
 * @returns {Promise<WowAccountProfileSummaryResponse>} - The promise of the fetch request
 */
export async function getWowAccountProfileSummary(region, token) {
	const apiBaseUri = getApiBaseUri(region);
	const ns = getApiNamespace(region, 'profile');
	const apiEndpoint = `${apiBaseUri}/profile/user/wow?namespace=${ns}&locale=${API_LOCALE}&access_token=${token}`
	const result = await getRemoteJson(apiEndpoint);
	return result;
}

/**
 * @typedef {Object} WowPrimaryProfessionTierRecipe
 * @property {number} id - The recipe id.
 * @property {string} name - The recipe name.
 */

/**
 * @typedef {Object} WowPrimaryProfessionTier
 * @property {number} skill_points - The profession skill points.
 * @property {number} max_skill_points - The profession max skill points.
 * @property {Object} tier - The profession tier object.
 * @property {number} tier.id - The profession tier id.
 * @property {string} tier.name - The profession tier name.
 * @property {Array<WowPrimaryProfessionTierRecipe>} known_recipes - The known recipes object.
 */

/**
 * @typedef {Object} WowPrimaryProfession
 * @property {Object} profession - The profession object.
 * @property {number} profession.id - The profession id.
 * @property {string} profession.name - The profession name.
 * @property {Array<WowPrimaryProfessionTier>} skill_tier - The profession skill tier.
 */

/**
 * @typedef {Object} WowCharacterProfileSummaryResponse
 * @property {Array<WowPrimaryProfession>} primaries - The character's primary professions.
 */

/**
 * Get the character's profession(s)
 * @param {WowRegion} region - The region to get the professions from
 * @param {string} realmSlug - The realm slug to get the professions from
 * @param {string} characterName - The character name to get the professions from
 * @param {string} token - The token to use for the request
 * @returns {Promise<WowCharacterProfileSummaryResponse>} - The promise of the fetch request
 */
export const getWowCharacterProfessionSummary = async (region, realmSlug, characterName, token) => {
	const apiBaseUri = getApiBaseUri(region);
	const ns = getApiNamespace(region, 'profile');
	const apiEndpoint = `${apiBaseUri}/profile/wow/character/${realmSlug}/${characterName}/professions?namespace=${ns}&locale=${API_LOCALE}&access_token=${token}`
	const result = await getRemoteJson(apiEndpoint);
	return result;
}
