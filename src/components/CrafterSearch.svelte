<script>
import { onMount } from 'svelte';
import { region } from '$stores/RegionStore';
import { fetchJson } from '$lib/client/Utils';
export let data;

/** @type {HTMLSelectElement} */
let realmSelectbox
/** @type {HTMLSelectElement} */
let professionSelectbox
/** @type {HTMLSelectElement} */
let itemslotSelectbox;

let selectedRegion = '';

/**
 * Resets the selectboxes to empty and disabled state
 * @param {Array<HTMLSelectElement>} selectboxes
 */
const resetSelectboxes = (selectboxes) => {
	selectboxes.forEach((selectbox) => {
		selectbox.innerHTML = '';
		selectbox.disabled = true;
	});
}

/**
 * @param {Array<{realm_id: number, name: string}>} realms
 */
const fillRealmSelectbox = async (realms) => {
	realmSelectbox.disabled = false;
	realmSelectbox.innerHTML = realms.map((realm) => {
		return `<option value="${realm.realm_id}">${realm.name}</option>`;
	}).join('');
};

/**
 * @param {string} value
 */
const onRegionChange = async (value) => {
	// if the value is the same as the selected region, we don't want to do anything
	if (value === selectedRegion) return;
	// if the value is not allowed, we don't want to do anything
	if (!['eu', 'us'].includes(value)) return;
	selectedRegion = value;
	// if the selectboxes are not set, we don't want to do anything
	if (!realmSelectbox || !professionSelectbox || !itemslotSelectbox) return;
	// in case the region is not set or the value has changed
	// we want to reset the selectbox
	resetSelectboxes([realmSelectbox, professionSelectbox, itemslotSelectbox]);
	const realmsResponse = await fetchJson(`/api/realms?region=${value}`);
	fillRealmSelectbox(realmsResponse.realms);
};

region.subscribe(onRegionChange);

onMount(async () => {
	if (data?.region) {
		onRegionChange(data.region);
	}
});
</script>

<form class="max-w-sm mx-auto">
	<select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="realm" bind:this={realmSelectbox} disabled></select>
	<select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="profession" bind:this={professionSelectbox} disabled></select>
	<select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="itemslot" bind:this={itemslotSelectbox} disabled></select>
</form>

