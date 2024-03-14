import {
	PRIVATE_BNET_CLIENT_SECRET,
} from '$env/static/private'

import {
	PUBLIC_BNET_CLIENT_ID,
	PUBLIC_REDIRECT_URI
} from '$env/static/public'

import {
	API_LOCALE,
	API_NAMESPACE,
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
 * Get the auth string for the api
 * @returns {string} - The auth string for the api
 */
function getAuthString() {
	return `${PUBLIC_BNET_CLIENT_ID}:${PRIVATE_BNET_CLIENT_SECRET}`;
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
	let result = null;
	let jsonResult = null;
	const headers = new Headers({
		'Authorization': `Basic ${btoa(getAuthString())}`,
	});
	try {
		result = await fetch(apiEndpoint, {
			credentials: 'include',
			method: 'POST',
			headers: headers
		});
		try {
			jsonResult = await result.json();
		} catch (e) {
			console.error('error', e);
		}
	} catch (e) {
		console.error('error', e);
	}
	return jsonResult;
}

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
	const apiEndpoint = `${apiBaseUri}/profile/user/wow?namespace=${API_NAMESPACE}&locale=${API_LOCALE}&access_token=${token}`
	let result = null;
	let jsonResult = null;
	try {
		result = await fetch(apiEndpoint, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});
		try {
			jsonResult = await result.json();
		} catch (e) {
			console.error('error', e);
		}
	} catch (e) {
		console.error('error', e);
	}
	return jsonResult;
}
