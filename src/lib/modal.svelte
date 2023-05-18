<script lang="ts">
	import { browser } from '$app/environment';
	import { Account, Client, type Models } from 'appwrite';
	import { onMount } from 'svelte';

	export let borderRadius: 'xs' | 'm' | 'xl' = 'xs';
	// export let brandColor: 'pink' | 'orange' | 'green' | 'blue' | 'red' = 'blue';
	export let name: string = '';

	export let successUrl: string = '';
	export let failureUrl: string = '';
	export let provider: string = '';
	export let providerData: string = '';

	export let allowGuest: boolean = false;
	export let allowGoogle: boolean = false;
	export let allowGitHub: boolean = false;
	export let allowTwitter: boolean = false;
	export let allowFacebook: boolean = false;
	export let allowPhone: boolean = false;
	export let allowMagicUrl: boolean = false;

	let currentUser: null | Models.User<any> = null;

	// Credentials section
	let email = '';
	let password = '';

	let isCredentialsLoading = false;
	let credentialsError = '';

	// Guest section
	let isGuestLoading = false;
	let guestError = '';

	// Sign out section
	let isSignOutLoading = false;
	let signOutError = '';

	onMount(async () => {
		if (browser) {
			try {
				const account = new Account(getClient());
				currentUser = await account.get();
			} catch (err: any) {
				// Ignore
			}
		}
	});

	function getClient() {
		if (provider !== 'appwrite') {
			throw new Error('Provider not supported.');
		}

		const { providerEndpoint, providerProject } = JSON.parse(providerData);

		return new Client().setEndpoint(providerEndpoint).setProject(providerProject);
	}

	function loginOAuth(provider: string) {
		const account = new Account(getClient());
		account.createOAuth2Session(provider, successUrl, failureUrl);
	}

	async function loginCredentials() {
		if (isCredentialsLoading) {
			return;
		}

		isCredentialsLoading = true;
		credentialsError = '';

		try {
			const account = new Account(getClient());
			await account.createEmailSession(email, password);

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

	async function signOut() {
		if (isSignOutLoading) {
			return;
		}

		isSignOutLoading = true;
		signOutError = '';

		try {
			const account = new Account(getClient());
			await account.deleteSession('current');

			currentUser = null;
		} catch (err: any) {
			signOutError = err.message;
			isSignOutLoading = false;
		}
	}
</script>

<div
	style={`width: 100%; --c-border-radius: ${
		borderRadius === 'xs' ? '4px' : borderRadius === 'm' ? '12px' : '20px'
	};`}
	class="c-modal u-flex u-flex-vertical u-gap-8"
>
	<a href={failureUrl} class="button is-text" style="padding: 0px;"
		><span class="icon-cheveron-left" aria-hidden="true" /><span class="text">Back to Website</span
		></a
	>

	{#if currentUser}
		<section class="card" style="width: 100%;">
			<div class="u-max-width-500 u-width-full-line">
				<h1 class="heading-level-3 u-margin-block-start-auto">Welcome</h1>
				<p>
					You are already signed in as <span class="u-bold" style="color: black;"
						>{currentUser.name
							? currentUser.name
							: currentUser.email
							? currentUser.email
							: currentUser.phone
							? currentUser.phone
							: 'Anonymous'}</span
					>
				</p>
				<div class="u-margin-block-start-24">
					<div class="form common-section" data-hs-cf-bound="true">
						<ul class="form-list">
							<li class="form-item u-flex u-flex-vertical u-gap-8">
								<div class="form" data-hs-cf-bound="true">
									<ul class="form-list">
										<li class="form-item">
											<a href={successUrl}>
												<button class="button is-full-width" type="submit">Continue</button></a
											>

											<div
												style="margin: 1.5rem 0px; border-top: 0.0625rem solid hsl(var(--color-neutral-30));"
											/>

											{#if isSignOutLoading}
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
													class="button is-secondary is-full-width"
													type="button"
													on:click={signOut}>Sign Out</button
												>
											{/if}

											{#if signOutError}
												<div
													class="u-text-center u-bold u-margin-block-start-16"
													style="color: hsl(var(--color-text-danger))"
												>
													<p class="text">{signOutError}</p>
												</div>
											{/if}
										</li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	{:else}
		<section class="card" style="width: 100%;">
			<div class="u-max-width-500 u-width-full-line">
				<h1 class="heading-level-3 u-margin-block-start-auto">Log in {name ? `to ${name}` : ''}</h1>
				<div class="u-margin-block-start-24">
					<div class="form common-section" data-hs-cf-bound="true">
						<ul class="form-list">
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

								<form
									on:submit|preventDefault={loginCredentials}
									class="form"
									data-hs-cf-bound="true"
								>
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
											<div class="input-text-wrapper">
												<input
													bind:value={password}
													id="password"
													placeholder="Password"
													required={true}
													minlength="8"
													type="password"
													class="input-text"
													autocomplete="off"
												/>
												<button
													type="button"
													class="show-password-button"
													aria-label="show password"
													><span aria-hidden="true" class="icon-eye" /></button
												>
											</div>
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
												<button class="button is-full-width" type="submit">Sign in</button>
											{/if}
											{#if credentialsError}
												<div
													class="u-text-center u-bold u-margin-block-start-16"
													style="color: hsl(var(--color-text-danger))"
												>
													<p class="text">{credentialsError}</p>
												</div>
											{/if}
										</li>
									</ul>
								</form>

								{#if allowGuest || allowMagicUrl || allowPhone}
									<div
										style="margin: 1.5rem 0px; border-top: 0.0625rem solid hsl(var(--color-neutral-30));"
									/>
								{/if}

								{#if allowMagicUrl || allowPhone}
									<span class="eyebrow-heading-3" style="margin-bottom: 0.3rem;"
										>Passwordless Login</span
									>
								{/if}

								{#if allowMagicUrl}
									<button class="button is-secondary is-full-width" type="button"
										><span class="icon-mail" aria-hidden="true" />
										<span class="text">Sign in with Email</span></button
									>
								{/if}

								{#if allowPhone}
									<button class="button is-secondary is-full-width" type="button"
										><span class="icon-phone" aria-hidden="true" />
										<span class="text">Sign in with SMS</span></button
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
						</ul>
					</div>
				</div>
			</div>
		</section>

		<p
			style="color: hsl(var(--color-neutral-70));"
			class="u-x-small u-margin-block-start-12 u-text-center"
		>
			By joining, you agree to our <a
				class="u-bold"
				href="https://appwrite.io/policy/terms"
				target="_blank">Terms of Service</a
			>
			and
			<a class="u-bold" href="https://appwrite.io/policy/privacy" target="_blank">Privacy Policy</a>
		</p>
	{/if}
</div>
