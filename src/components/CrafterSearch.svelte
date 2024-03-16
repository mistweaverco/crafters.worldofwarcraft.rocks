<script>
import { region } from './../stores/RegionStore';
/** @type {HTMLSelectElement} */
let regionSelectbox
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
 * @param {string} value
 */
const onRegionChange = (value) => {
	// if the value is the same as the selected region, we don't want to do anything
	if (value === selectedRegion) return;
	// if the value is not allowed, we don't want to do anything
	if (!['eu', 'us'].includes(value)) return;
	selectedRegion = value;
	// if the selectboxes are not set, we don't want to do anything
	if (!regionSelectbox || !professionSelectbox || !itemslotSelectbox) return;
	// in case the region is not set or the value has changed
	// we want to reset the selectbox
	resetSelectboxes([regionSelectbox, professionSelectbox, itemslotSelectbox]);
};

region.subscribe(onRegionChange);
</script>

<select class="w-full" name="realm" bind:this={regionSelectbox} disabled></select>
<select class="w-full" name="profession" bind:this={professionSelectbox} disabled></select>
<select class="w-full" name="itemslot" bind:this={itemslotSelectbox} disabled></select>

