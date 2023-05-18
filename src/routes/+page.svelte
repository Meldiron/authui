<script>
	import Generator from '../lib/generator.svelte';

	import { page } from '$app/stores';
	import Modal from '../lib/modal.svelte';

	$: isSubdomain = $page.url.hostname.endsWith('localhost')
		? $page.url.hostname.split('.').length >= 2
			? true
			: false
		: $page.url.hostname.split('.').length >= 3
		? true
		: false;
</script>

{#if isSubdomain}
	<div class="u-flex u-main-center u-cross-center" style="min-height: 100vh; padding: 1rem; width: 100%; max-width: 500px; margin-left: auto; margin-right: auto;">
		<Modal />
	</div>
{:else}
	<Generator />
{/if}
