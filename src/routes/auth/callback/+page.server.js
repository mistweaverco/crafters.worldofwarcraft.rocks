import {
	PRIVATE_BNET_CLIENT_SECRET,
} from '$env/static/private'

import {
	PUBLIC_BNET_CLIENT_ID,
	PUBLIC_REDIRECT_URI
} from '$env/static/public'


const API_NAMESPACE = 'profile-eu';
const API_OAUTH_TOKEN_ENDPOINT = 'https://eu.battle.net/oauth/token';

function getAuthString() {
	return `${PUBLIC_BNET_CLIENT_ID}:${PRIVATE_BNET_CLIENT_SECRET}`;
}

async function getApiToken(code) {
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

async function getApiResults(token) {
	const apiEndpoint = `https://eu.api.blizzard.com/profile/user/wow?namespace=${API_NAMESPACE}&locale=en_US&access_token=${token}`
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
			jsonResult = await result.text();
		} catch (e) {
			console.error('error', e);
		}
	} catch (e) {
		console.error('error', e);
	}
	return jsonResult;
}

export async function load({ url }) {
	const query = url.searchParams;
	const code = query.get('code');
	const apiTokenResult = await getApiToken(code);
	console.log('apiTokenResult', apiTokenResult);
	return apiTokenResult;
}

