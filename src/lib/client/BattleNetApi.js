export const API_LOCALE = 'en_US';
export const API_NAMESPACE = 'profile-eu';
export const API_OAUTH_TOKEN_ENDPOINT = 'https://eu.battle.net/oauth/token';

/**
 * @typedef {"eu" | "us"} WowRegion
 */

/**
 * Get the auth click url
 * @param {WowRegion} region - The region to get the auth click url for
 * @returns {string} - The auth click url
 */
export function getAuthClickUrl(region) {
	return `https://${region}.battle.net/oauth/authorize?client_id=${PUBLIC_BNET_CLIENT_ID}&redirect_uri=${PUBLIC_REDIRECT_URI}&response_type=code&scope=wow.profile&state=xyz`;
}
