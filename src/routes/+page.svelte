<script lang="ts">
	import Generator from '$lib/generator.svelte';

	import { page } from '$app/stores';

	import type { PageData } from './$types';
	import ModalWrapper from '$lib/modal-wrapper.svelte';
	export let data: PageData;

	$: isSubdomain = $page.url.hostname.endsWith('localhost')
		? $page.url.hostname.split('.').length >= 2
			? true
			: false
		: $page.url.hostname.split('.').length >= 3
		? $page.url.hostname.startsWith('www')
			? false
			: true
		: false;
</script>

{#if isSubdomain}
	<ModalWrapper page={data.page} action="signIn" />
{:else}
	<Generator />
{/if}
