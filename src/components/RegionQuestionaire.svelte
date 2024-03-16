<script>
import { isRegionQuestionaireOpen } from './../stores/RegionQuestionaireStore';
import { region } from './../stores/RegionStore';

/**
 * @this {HTMLButtonElement}
 */
const handleButtonClick = function() {
	region.set(this.value);
	isRegionQuestionaireOpen.set(false);
}
</script>

<div class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-gray-100 opacity-90 z-10">
	<div class="bg-slate-900 text-white rounded-md px-8 py-9 relative max-w-lg">
		<p class="text-center">Please select your region</p>
		<button class="bg-white text-slate-900 rounded-md px-2 py-1" value="eu" on:click={handleButtonClick}>EU</button>
		<button class="bg-white text-slate-900 rounded-md px-2 py-1" value="us" on:click={handleButtonClick}>US</button>
	</div>
</div>
