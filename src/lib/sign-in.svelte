<script lang="ts">
	import { Account, Client } from 'appwrite';
	import Password from './components/password.svelte';

	export let isPreview = false;
	export let getClient: () => Client;
	export let allowSignUp = true;

	export let successUrl: string = '';
	export let failureUrl: string = '';

	export let allowGuest: boolean = false;
	export let allowGoogle: boolean = false;
	export let allowGitHub: boolean = false;
	export let allowTwitter: boolean = false;
	export let allowFacebook: boolean = false;
	export let allowPhone: boolean = false;
	export let allowMagicUrl: boolean = false;
	export let allowEmailOtp: boolean = false;

	// Credentials section
	let email = '';
	let password = '';

	let isCredentialsLoading = false;
	let credentialsError = '';

	// Guest section
	let isGuestLoading = false;
	let guestError = '';

	function loginOAuth(provider: string) {
		const account = new Account(getClient());
		account.createOAuth2Session(provider as any, successUrl, failureUrl);
	}

	async function loginCredentials() {
		if (isCredentialsLoading) {
			return;
		}

		isCredentialsLoading = true;
		credentialsError = '';

		try {
			const account = new Account(getClient());
			await account.createEmailPasswordSession(email, password);

			window.location.href = successUrl;
		} catch (err: any) {
			credentialsError = err.message;
			isCredentialsLoading = false;
		}
	}

	async function loginGuest() {
		if (isGuestLoading) {
			return;
		}

		isGuestLoading = true;
		guestError = '';

		try {
			const account = new Account(getClient());
			await account.createAnonymousSession();

			window.location.href = successUrl;
		} catch (err: any) {
			guestError = err.message;
			isGuestLoading = false;
		}
	}
</script>

<li class="form-item u-flex u-flex-vertical u-gap-8">
	{#if allowGoogle || allowGitHub || allowFacebook || allowTwitter}
		<span class="eyebrow-heading-3" style="margin-bottom: 0.3rem;">Social Login</span>
	{/if}

	{#if allowGoogle}
		<button
			on:click={() => loginOAuth('google')}
			style="background-color: #DB4437; color: white; border: none;"
			class="button is-full-width"
			type="button"
			><span class="icon-google" aria-hidden="true" />
			<span class="text">Sign in with Google</span></button
		>
	{/if}

	{#if allowGitHub}
		<button
			on:click={() => loginOAuth('github')}
			style="background-color: #181717; color: white; border: none;"
			class="button is-full-width"
			type="button"
			><span class="icon-github" aria-hidden="true" />
			<span class="text">Sign in with GitHub</span></button
		>
	{/if}

	{#if allowTwitter}
		<button
			on:click={() => loginOAuth('twitter')}
			style="background-color: #1DA1F2; color: white; border: none;"
			class="button is-full-width"
			type="button"
			><span class="icon-twitter" aria-hidden="true" />
			<span class="text">Sign in with Twitter</span></button
		>
	{/if}

	{#if allowFacebook}
		<button
			style="background-color: #1877F2; color: white; border: none;"
			class="button is-full-width"
			type="button"
			on:click={() => loginOAuth('facebook')}
			><span class="icon-facebook" aria-hidden="true" />
			<span class="text">Sign in with Facebook</span></button
		>
	{/if}

	{#if allowGoogle || allowGitHub || allowFacebook || allowTwitter}
		<span class="eyebrow-heading-3" style="margin-bottom: 0.3rem; margin-top: 1rem;"
			>Credentials Login</span
		>
	{/if}

	<form on:submit|preventDefault={loginCredentials} class="form" data-hs-cf-bound="true">
		<ul class="form-list">
			<li class="form-item">
				<label class="label is-required" for="email">Email</label>
				<div class="input-text-wrapper">
					<input
						bind:value={email}
						id="email"
						placeholder="Email"
						required={true}
						type="email"
						class="input-text"
						autocomplete="off"
					/>
				</div>
			</li>
			<li class="form-item">
				<label class="label is-required" for="password">Password</label>
				<Password bind:password />
			</li>
			<li class="form-item">
				{#if isCredentialsLoading}
					<button
						class="button is-text u-flex u-main-center"
						style="width: 100%;"
						disabled={true}
						type="button"
					>
						<div class="loader" />
					</button>
				{:else}
					<button class="c-branded-button button is-full-width" type="submit">Sign in</button>
				{/if}

				{#if credentialsError}
					<div
						class="u-text-center u-bold u-margin-block-start-16"
						style="color: hsl(var(--color-text-danger))"
					>
						<p class="text">{credentialsError}</p>
					</div>
				{/if}

				<ul class="inline-links is-center is-with-sep u-margin-block-start-16">
					<li class="inline-links-item">
						<a href={isPreview ? undefined : '/forgot-password'} type="button"
							><span class="text">Forgot Password?</span></a
						>
					</li>
					{#if allowSignUp}
						<li class="inline-links-item">
							<a href={isPreview ? undefined : '/sign-up'} type="button"
								><span class="text">Sign Up</span></a
							>
						</li>
					{/if}
				</ul>
			</li>
		</ul>
	</form>

	{#if allowGuest || allowMagicUrl || allowEmailOtp || allowPhone}
		<div class="c-divider" />
	{/if}

	{#if allowMagicUrl || allowEmailOtp || allowPhone}
		<span class="eyebrow-heading-3" style="margin-bottom: 0.3rem;">Passwordless Login</span>
	{/if}

	{#if allowMagicUrl || allowEmailOtp}
		<a
			href={isPreview ? undefined : '/email-login'}
			class="button is-secondary is-full-width"
			type="button"
			><span class="icon-mail" aria-hidden="true" />
			<span class="text">Sign in with Email</span></a
		>
	{/if}

	{#if allowPhone}
		<a
			href={isPreview ? undefined : '/sms-login'}
			class="button is-secondary is-full-width"
			type="button"
			><span class="icon-phone" aria-hidden="true" />
			<span class="text">Sign in with SMS</span></a
		>
	{/if}

	{#if allowGuest}
		<span class="eyebrow-heading-3" style="margin-bottom: 0.3rem; margin-top: 1rem;"
			>Limited account</span
		>

		{#if isGuestLoading}
			<button
				class="button is-text u-flex u-main-center"
				style="width: 100%;"
				disabled={true}
				type="button"
			>
				<div class="loader" />
			</button>
		{:else}
			<button
				on:click={loginGuest}
				class="is-border-dashed button is-text is-full-width"
				type="button"
				><span class="icon-anonymous" aria-hidden="true" />
				<span class="text">Continue as Guest</span></button
			>
		{/if}

		{#if guestError}
			<div
				class="u-text-center u-bold u-margin-block-start-16"
				style="color: hsl(var(--color-text-danger))"
			>
				<p class="text">{guestError}</p>
			</div>
		{/if}
	{/if}
</li>
