<script lang="ts">
	import Generator from '$lib/generator.svelte';

	import { page } from '$app/stores';
	import Modal from '$lib/modal.svelte';

	import type { PageData } from './$types';
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
	<div
		class="u-flex u-main-center u-cross-center"
		style="min-height: 100vh; padding: 1rem; width: 100%; max-width: 500px; margin-left: auto; margin-right: auto;"
	>
		{#if data.page}
			<Modal fileId={data.page.fileId} brandColor={data.page.brandColor} successUrl={data.page.successUrl} failureUrl={data.page.failureUrl} provider={data.page.provider} providerData={data.page.providerData} name={data.page.name} borderRadius={data.page.borderRadius} allowGitHub={data.page.allowGitHub} allowGuest={data.page.allowGuest} allowFacebook={data.page.allowFacebook} allowGoogle={data.page.allowGoogle} allowTwitter={data.page.allowTwitter} allowPhone={data.page.allowPhone} allowMagicUrl={data.page.allowMagicUrl} />
		{:else}
			<div
				class="u-flex u-main-center u-cross-center"
				style="min-height: 100vh; padding: 1rem; width: 100%; max-width: 500px; margin-left: auto; margin-right: auto;"
			>
				<section class="alert-sticky is-info">
					<div class="alert-sticky-image"><span class="icon-info" aria-hidden="true" /></div>
					<div class="alert-sticky-content">
						<h4 class="alert-sticky-title">Page Not Found</h4>
						<p>This domain was not configured yet, and can still be claimed.</p>
					</div>
					<div class="alert-sticky-buttons u-flex">
						<a href="https://www.authui.site/" class="button is-text is-small"><span class="text">Create Page</span></a
						>
					</div>
				</section>
			</div>
		{/if}
	</div>
{:else}
	<Generator />
{/if}
