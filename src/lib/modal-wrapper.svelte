<script lang="ts">
	import { PUBLIC_HOSTNAME, PUBLIC_HOSTNAME_PROTOCOL } from '$env/static/public';

	import Modal from '$lib/modal.svelte';
	import type { AppwritePage } from './appwrite';

	export let page: AppwritePage | null;

	export let action:
		| 'signIn'
		| 'signUp'
		| 'forgotPassword'
		| 'forgotPasswordFinish'
		| 'phoneLogin'
		| 'magicUrl'
		| 'magicUrlFinish' = 'signIn';
</script>

<div
	class="u-flex u-main-center u-cross-center"
	style="min-height: 100vh; padding: 1rem; width: 100%; max-width: 500px; margin-left: auto; margin-right: auto;"
>
	{#if page}
		<Modal
			lightContrast={page.lightContrast}
			allowSignUp={page.allowSignUp}
			{action}
			privacyPolicy={page.privacyPolicy}
			termsOfService={page.termsOfService}
			fileId={page.fileId}
			brandColor={page.brandColor}
			successUrl={page.successUrl}
			failureUrl={page.failureUrl}
			provider={page.provider}
			providerData={page.providerData}
			name={page.name}
			borderRadius={page.borderRadius}
			allowGitHub={page.allowGitHub}
			allowGuest={page.allowGuest}
			allowFacebook={page.allowFacebook}
			allowGoogle={page.allowGoogle}
			allowTwitter={page.allowTwitter}
			allowPhone={page.allowPhone}
			allowMagicUrl={page.allowMagicUrl}
			allowEmailOtp={page.allowEmailOtp}
		/>
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
					<a
						href={`${PUBLIC_HOSTNAME_PROTOCOL}://${PUBLIC_HOSTNAME}/`}
						class="button is-text is-small"><span class="text">Create Page</span></a
					>
				</div>
			</section>
		</div>
	{/if}
</div>
