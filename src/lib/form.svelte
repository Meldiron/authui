<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ID, Permission, Role } from 'appwrite';
	import { AppwriteDatabases, AppwriteStorage, type AppwritePage } from './appwrite';
	import Modal from './modal.svelte';
	import { accountStore } from './stores';
	import { goto } from '$app/navigation';

	export let page: AppwritePage | null = null;
	export let showInfo = false;

	let provider = page ? page.provider : 'appwrite';
	let providerProject = page ? JSON.parse(page.providerData).providerProject : '';
	let providerEndpoint = page
		? JSON.parse(page.providerData).providerEndpoint
		: 'https://cloud.appwrite.io/v1';

	let fileId = page ? page.fileId : '';
	let successUrl = page ? page.successUrl : '';
	let failureUrl = page ? page.failureUrl : '';
	let domain = page ? page.domain : '';

	let name = page ? page.name : '';
	let brandColor: 'primary' | 'success' | 'information' | 'warning' | 'neutral' = page
		? page.brandColor
		: 'neutral';
	let borderRadius: 'xs' | 'm' | 'xl' = page ? page.borderRadius : 'xs';

	let allowGuest = page ? page.allowGuest : false;
	let allowMagicUrl = page ? page.allowMagicUrl : false;
	let allowPhone = page ? page.allowPhone : false;

	let allowGoogle = page ? page.allowGoogle : false;
	let allowGitHub = page ? page.allowGitHub : false;
	let allowTwitter = page ? page.allowTwitter : false;
	let allowFacebook = page ? page.allowFacebook : false;

	let isLoading = false;
	let error = '';
	let created = showInfo === true ? true : false;

	async function onSubmit() {
		if (isLoading) {
			return;
		}

		error = '';
		isLoading = true;

		try {
			const userId = $accountStore?.$id as string;

			const data = {
				fileId,
				domain,
				name,
				successUrl,
				failureUrl,
				provider,
				providerData: JSON.stringify({ providerProject, providerEndpoint }),
				borderRadius,
				brandColor,
				allowGuest,
				allowMagicUrl,
				allowPhone,
				allowGoogle,
				allowGitHub,
				allowTwitter,
				allowFacebook,
				userId: $accountStore?.$id ?? ''
			};

			const permissions = [
				Permission.read(Role.user(userId)),
				Permission.update(Role.user(userId)),
				Permission.delete(Role.user(userId))
			];

			if (page === null) {
				const project = await AppwriteDatabases.createDocument(
					'main',
					'pages',
					ID.unique(),
					data,
					permissions
				);

				goto(`/pages/${project.$id}/info`);
			} else {
				const project = await AppwriteDatabases.updateDocument(
					'main',
					'pages',
					page.$id,
					data,
					permissions
				);

				goto(`/pages/${project.$id}/info`);
			}

			isLoading = false;
		} catch (err: any) {
			error = err.message;
			isLoading = false;
		}
	}

	async function onDelete() {
		if (confirm('Are you sure you want to delete?')) {
			isLoading = true;

			try {
				await AppwriteDatabases.deleteDocument('main', 'pages', page?.$id ?? '');

				goto(`/`);

				isLoading = false;
			} catch (err: any) {
				error = err.message;
				isLoading = false;
			}
		}
	}

	let uploadingLogo = false;
	let logoError = '';
	async function uploadFile(event: any) {
		const file = event?.target?.files[0] ?? null;
		if (file) {
			uploadingLogo = true;
			try {
				const userId = $accountStore?.$id as string;

				const response = await AppwriteStorage.createFile('logos', ID.unique(), file, [
					Permission.read(Role.user(userId)),
					Permission.update(Role.user(userId)),
					Permission.delete(Role.user(userId))
				]);

				fileId = response.$id;
			} catch (err: any) {
				logoError = err.message;
			} finally {
				uploadingLogo = false;
			}
		}
	}
</script>

<form on:submit|preventDefault={onSubmit} class="card common-section">
	{#if !created}
		<h6 class="heading-level-7">{page === null ? 'Create Page' : 'Edit Page'}</h6>
		<p class="u-margin-block-start-8">Customize and configure your auth page.</p>
		<div class="card-separator" style="padding-block-start: 1rem;" />
	{/if}

	<div class="common-section grid-1-2" style="position: relative;">
		{#if $accountStore === undefined || $accountStore === null}
			<div class="c-hidden-card">
				<section class="modal is-small">
					<form class="modal-form" method="dialog">
						{#if $accountStore === null}
							<header class="modal-header">
								<h4 class="modal-title heading-level-5">Sign In First</h4>
								<button class="button is-text is-small is-only-icon" aria-label="Close modal">
									<span class="icon-x" aria-hidden="true" />
								</button>
							</header>
							<div class="modal-content u-small">
								Ownership of Auth UI page is important. Without ownership, you would not be able to
								edit the page in future. Please sign in to continue.
							</div>
							<div class="modal-footer">
								<div class="u-flex u-main-end u-gap-16">
									<a href="https://login.authui.site/" class="button is-secondary">
										<span class="text">Sign In</span>
									</a>
								</div>
							</div>
						{:else}
							<div class="u-flex u-main-center"><div class="loader" /></div>
						{/if}
					</form>
				</section>
			</div>
		{/if}

		{#if !created}
			<div class="grid-1-2-col-1 u-flex u-flex-vertical u-gap-24">
				<h3 class="heading-level-7">1. Design</h3>
				<div>
					<h3 class="eyebrow-heading-3">Brand Color</h3>

					<div class="u-flex u-flex-wrap u-gap-12 u-margin-block-start-12">
						<button type="button" on:click={() => (brandColor = 'neutral')}>
							<div
								class="avatar"
								style="background-color: hsl(var(--color-neutral-200)); color: white;"
							>
								{#if brandColor === 'neutral'}
									<span class="icon-check" aria-hidden="true" />
								{/if}
							</div>
						</button>
						<button type="button" on:click={() => (brandColor = 'primary')}>
							<div
								class="avatar"
								style="background-color: hsl(var(--color-primary-100)); color: white;"
							>
								{#if brandColor === 'primary'}
									<span class="icon-check" aria-hidden="true" />
								{/if}
							</div>
						</button>
						<button type="button" on:click={() => (brandColor = 'success')}>
							<div
								class="avatar"
								style="background-color: hsl(var(--color-success-100)); color: white;"
							>
								{#if brandColor === 'success'}
									<span class="icon-check" aria-hidden="true" />
								{/if}
							</div>
						</button>
						<button type="button" on:click={() => (brandColor = 'information')}>
							<div
								class="avatar"
								style="background-color: hsl(var(--color-information-100)); color: white;"
							>
								{#if brandColor === 'information'}
									<span class="icon-check" aria-hidden="true" />
								{/if}
							</div>
						</button>
						<button type="button" on:click={() => (brandColor = 'warning')}>
							<div
								class="avatar"
								style="background-color: hsl(var(--color-warning-100)); color: white;"
							>
								{#if brandColor === 'warning'}
									<span class="icon-check" aria-hidden="true" />
								{/if}
							</div>
						</button>
					</div>
				</div>

				<div>
					<h3 class="eyebrow-heading-3">Rounded Corners</h3>

					<div class="c-mini-radio u-flex u-flex-wrap u-gap-12 u-margin-block-start-12">
						<button
							type="button"
							on:click={() => (borderRadius = 'xs')}
							class="button is-only-icon is-secondary"
						>
							<input
								style="display: none;"
								type="radio"
								bind:group={borderRadius}
								name="borderRadius"
								value="xs"
							/>
							<span class="u-x-small">XS</span>
						</button>
						<button
							type="button"
							on:click={() => (borderRadius = 'm')}
							class="button is-only-icon is-secondary"
						>
							<input
								style="display: none;"
								type="radio"
								bind:group={borderRadius}
								name="borderRadius"
								value="m"
							/>
							<span class="u-x-small">M</span>
						</button>
						<button
							type="button"
							on:click={() => (borderRadius = 'xl')}
							class="button is-only-icon is-secondary"
						>
							<input
								style="display: none;"
								type="radio"
								bind:group={borderRadius}
								name="borderRadius"
								value="xl"
							/>
							<span class="u-x-small">XL</span>
						</button>
					</div>
				</div>

				<div>
					<h3 class="eyebrow-heading-3">App Logo</h3>

					<input
						on:change={uploadFile}
						type="file"
						accept="image/png, image/gif, image/jpeg, image/jpg, image/svg+xml, image/webp"
						class="u-margin-block-start-12"
					/>

					{#if uploadingLogo}
						<div class="u-margin-block-start-12">
							<div class="loader" />
						</div>
					{/if}
					{#if logoError}
						<div
							class="u-margin-block-start-12"
							style="color: hsl(var(--color-text-danger))"
						>
							<p class="text">{logoError}</p>
						</div>
					{/if}
				</div>

				<h3 class="heading-level-7 u-margin-block-start-16">2. Configure</h3>

				<div>
					<div class="form u-width-full-line u-max-width-500">
						<ul class="form-list">
							<li class="form-item">
								<label class="label" for="name">App Name</label>
								<div class="input-text-wrapper">
									<input
										type="text"
										id="name"
										class="input-text"
										bind:value={name}
										placeholder="My Awesome App"
									/>
								</div>
							</li>
							<li class="form-item c-domain">
								<label class="label is-required" for="domain">Domain</label>
								<div class="input-text-wrapper" style="--amount-of-buttons:2.2">
									<input
										required={true}
										type="text"
										id="domain"
										bind:value={domain}
										placeholder="my-awesome-app"
									/>
									<div class="options-list">
										<div class="options-list-button">.authui.site</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<ul class="form-list">
					<li class="form-item">
						<label class="choice-item" for="magicUrl"
							><div class="input-text-wrapper">
								<input
									bind:checked={allowGuest}
									id="magicUrl"
									type="checkbox"
									class="switch"
									role="switch"
								/>
							</div>
							<div class="choice-item-content">
								<div class="choice-item-title">Guest</div>
								<div class="choice-item-paragraph">
									1-click sign up. User instantly gets account, but they can't sign into it later.
								</div>
							</div></label
						>
					</li>
					<li class="form-item">
						<label class="choice-item" for="magicUrl"
							><div class="input-text-wrapper">
								<input
									bind:checked={allowMagicUrl}
									id="magicUrl"
									type="checkbox"
									class="switch"
									role="switch"
								/>
							</div>
							<div class="choice-item-content">
								<div class="choice-item-title">Magic URL</div>
								<div class="choice-item-paragraph">
									Passwordless login. User recieves email and when they visit URL delivered by mail,
									they get logged in.
								</div>
							</div></label
						>
					</li>

					<li class="form-item">
						<label class="choice-item" for="phone"
							><div class="input-text-wrapper">
								<input
									bind:checked={allowPhone}
									id="phone"
									type="checkbox"
									class="switch"
									role="switch"
								/>
							</div>
							<div class="choice-item-content">
								<div class="choice-item-title">Phone</div>
								<div class="choice-item-paragraph">
									SMS login. User recieves phone SMS with a code. To login, they enter 6 digit code.
								</div>
							</div></label
						>
					</li>
					<li class="form-item">
						<label class="choice-item" for="oauth"
							><div class="input-text-wrapper" />
							<div class="choice-item-content">
								<div class="choice-item-title">OAuth</div>
								<div class="choice-item-paragraph">
									Login user using their existing social platform account. User will be redirected
									to autorize.
								</div>

								<div class="u-flex u-flex-vertical u-gap-8">
									<label for="google" class="u-flex u-gap-8">
										<input bind:checked={allowGoogle} type="checkbox" id="google" />
										<div><span class="text">Google</span></div>
									</label>
									<label for="github" class="u-flex u-gap-8">
										<input bind:checked={allowGitHub} type="checkbox" id="github" />
										<div><span class="text">GitHub</span></div>
									</label>
									<label for="twitter" class="u-flex u-gap-8">
										<input bind:checked={allowTwitter} type="checkbox" id="twitter" />
										<div><span class="text">Twitter</span></div>
									</label>

									<label for="facebook" class="u-flex u-gap-8">
										<input bind:checked={allowFacebook} type="checkbox" id="facebook" />
										<div><span class="text">Facebook</span></div>
									</label>
								</div>
							</div></label
						>
					</li>
				</ul>

				<h3 class="heading-level-7 u-margin-block-start-16">3. Connect</h3>

				<ul
					class="grid-box"
					style="--p-grid-item-size:10em; --p-grid-item-size-small-screens:10rem;"
				>
					<li>
						<label
							class="card is-allow-focus u-height-100-percent u-flex u-flex-vertical u-gap-16 u-cursor-pointer"
							style="--card-padding:0.5rem; padding-bottom: 1rem;"
						>
							<input type="radio" bind:group={provider} name="provider" value="appwrite" />
							<div class="u-flex u-flex-vertical u-gap-12 u-text-center">
								<img
									src="/providers/appwrite.svg"
									width="40"
									height="30"
									class="u-margin-inline-auto"
									alt=""
								/>
								<p>Appwrite</p>
							</div>
						</label>
					</li>

					<li>
						<label
							class="card u-height-100-percent u-flex u-flex-vertical u-gap-16"
							style="--card-padding:0.5rem; padding-bottom: 1rem;"
						>
							<input type="radio" name="provider" disabled value="supabase" bind:group={provider} />
							<div class="u-flex u-flex-vertical u-gap-12 u-text-center">
								<img
									src="/providers/supabase.svg"
									width="30"
									height="30"
									class="u-margin-inline-auto u-opacity-20"
									alt=""
								/>
								<p class="u-opacity-20">Possibly</p>
							</div>
						</label>
					</li>

					<li>
						<label
							class="card u-height-100-percent u-flex u-flex-vertical u-gap-16"
							style="--card-padding:0.5rem; padding-bottom: 1rem;"
						>
							<input
								type="radio"
								name="provider"
								disabled
								value="backendless"
								bind:group={provider}
							/>
							<div class="u-flex u-flex-vertical u-gap-12 u-text-center">
								<img
									src="/providers/backendless.svg"
									width="30"
									height="30"
									class="u-margin-inline-auto u-opacity-20"
									alt=""
								/>
								<p class="u-opacity-20">Unlikely</p>
							</div>
						</label>
					</li>

					<li>
						<label
							class="card u-height-100-percent u-flex u-flex-vertical u-gap-16"
							style="--card-padding:0.5rem; padding-bottom: 1rem;"
						>
							<input type="radio" name="provider" disabled value="firebase" bind:group={provider} />
							<div class="u-flex u-flex-vertical u-gap-12 u-text-center">
								<img
									src="/providers/firebase.svg"
									width="30"
									height="30"
									class="u-margin-inline-auto u-opacity-20"
									alt=""
								/>
								<p class="u-opacity-20">Absolutely not</p>
							</div>
						</label>
					</li>
				</ul>

				<div class="form u-width-full-line u-max-width-500">
					<ul class="form-list">
						<li class="form-item">
							<label class="label is-required" for="endpoint">Endpoint</label>
							<div class="input-text-wrapper">
								<input
									required={true}
									type="text"
									id="endpoint"
									class="input-text"
									bind:value={providerEndpoint}
									placeholder="https://.../v1"
								/>
							</div>
						</li>
						<li class="form-item">
							<label class="label is-required" for="projectId">Project ID</label>
							<div class="input-text-wrapper">
								<input
									required={true}
									type="text"
									id="projectId"
									class="input-text"
									bind:value={providerProject}
									placeholder="6465dc0c4b.........."
								/>
							</div>
						</li>
					</ul>
				</div>

				<h3 class="heading-level-7 u-margin-block-start-16">4. Redirect</h3>

				<div class="form u-width-full-line u-max-width-500">
					<ul class="form-list">
						<li class="form-item">
							<label class="label is-required" for="successUrl">Success URL</label>
							<div class="input-text-wrapper">
								<input
									required={true}
									type="text"
									id="successUrl"
									class="input-text"
									bind:value={successUrl}
									placeholder="https://..."
								/>
							</div>
						</li>
						<li class="form-item">
							<label class="label is-required" for="failureUrl">Failure URL</label>
							<div class="input-text-wrapper">
								<input
									required={true}
									type="text"
									id="failureUrl"
									class="input-text"
									bind:value={failureUrl}
									placeholder="https://..."
								/>
							</div>
						</li>
					</ul>
				</div>

				<div>
					{#if isLoading}
						<div class="loader" style="color: hsl(var(--color-primary-200));" />
					{:else}
						<div class="u-flex u-gap-4">
							<button type="submit" class="button">
								<span class="text">{page === null ? 'Create Auth Page' : 'Save Page'}</span></button
							>
							{#if page !== null}
								<button on:click={onDelete} type="button" class="button is-text">
									<span class="text">Delete Page</span></button
								>
							{/if}
						</div>
					{/if}

					{#if error}
						<section class="alert is-danger u-margin-block-start-12">
							<div class="alert-grid">
								<span class="icon-exclamation-circle" aria-hidden="true" />
								<div class="alert-content">
									<h6 class="alert-title">Something went wrong!</h6>
									<p class="alert-message">
										{error}
									</p>
								</div>
							</div>
						</section>
					{/if}
				</div>
			</div>
		{:else}
			<div class="grid-1-2-col-1 u-flex u-flex-vertical u-gap-24">
				<h1 class="heading-level-4">Auth Page Ready 🎉</h1>
				<h3 class="heading-level-7">Next steps</h3>

				<ul class="list">
					<li class="list-item">
						<span class="icon-check" aria-hidden="true" />
						<span class="text"
							>Add <code class="inline-code">{domain}.authui.site</code> as web platform in your Appwrite
							project</span
						>
					</li>

					<li class="list-item">
						<span class="icon-check" aria-hidden="true" />
						<span class="text"
							>In your app, redirect "Sign In / Sign Up" button to <code class="inline-code"
								>https://{domain}.authui.site/</code
							>. You can also use this URL instead of "Sign Out" button.</span
						>
					</li>

					<li class="list-item">
						<span class="icon-check" aria-hidden="true" />

						<div>
							<span class="text"
								>Make sure following sign-in methods are enabled on your project in your Appwrite
								Console under User settings:</span
							>

							<ol class="numeric-list u-margin-block-start-12">
								<li class="numeric-list-item">
									<span class="text"><p class="text u-margin-block-start-8">Email/Password</p></span
									>
								</li>
								{#if allowGuest}
									<li class="numeric-list-item">
										<span class="text"><p class="text u-margin-block-start-8">Anonymous</p></span>
									</li>
								{/if}
								{#if allowMagicUrl}
									<li class="numeric-list-item">
										<span class="text"><p class="text u-margin-block-start-8">Magic URL</p></span>
									</li>
								{/if}
								{#if allowPhone}
									<li class="numeric-list-item">
										<span class="text"><p class="text u-margin-block-start-8">Phone</p></span>
									</li>
								{/if}
							</ol>
						</div>
					</li>

					{#if allowGoogle || allowFacebook || allowTwitter || allowGitHub}
						<li class="list-item">
							<span class="icon-check" aria-hidden="true" />
							<div>
								<span class="text"
									>Make sure to configure following OAuth providers in Appwrite Console under Users
									settings:</span
								>

								<ol class="numeric-list u-margin-block-start-12">
									{#if allowGoogle}
										<li class="numeric-list-item">
											<span class="text"><p class="text u-margin-block-start-8">Google</p></span>
										</li>
									{/if}
									{#if allowGitHub}
										<li class="numeric-list-item">
											<span class="text"><p class="text u-margin-block-start-8">GitHub</p></span>
										</li>
									{/if}
									{#if allowTwitter}
										<li class="numeric-list-item">
											<span class="text"><p class="text u-margin-block-start-8">Twitter</p></span>
										</li>
									{/if}
									{#if allowFacebook}
										<li class="numeric-list-item">
											<span class="text"><p class="text u-margin-block-start-8">Facebook</p></span>
										</li>
									{/if}
								</ol>
							</div>
						</li>

						<li class="list-item">
							<span class="icon-check" aria-hidden="true" />
							<span class="text"
								>For OAuth to work properly on Safari, make sure your Appwrite endpoint is subdomain
								of your app domain. For example, Appwrite at <code class="inline-code"
									>appwrite.myapp.com</code
								>
								and your app at <code class="inline-code">myapp.com</code>. You can achieve that in
								Appwrite Console under Custom Domains in project settings.</span
							>
						</li>
					{/if}
				</ul>
			</div>
		{/if}

		<div class="grid-1-2-col-2 u-flex u-flex-vertical u-gap-24">
			<div class="tabs">
				<ul class="secondary-tabs is-large">
					<li class="secondary-tabs-item">
						{#if !created}
							<button disabled={true} class="secondary-tabs-button">
								<span class="text">Preview</span>
							</button>
						{:else}
							<button disabled={true} class="secondary-tabs-button">
								<span class="text">HTML</span>
							</button>
						{/if}
					</li>
				</ul>
			</div>
			<div style="position: sticky; top: 5rem;">
				{#if !created}
					<section
						class="card u-grid u-cross-center u-width-full-line"
						style="background-color: hsl(var(--p-body-bg-color));"
					>
						<div class="u-flex u-cross-center u-flex-vertical u-main-center" style="width: 100%;">
							<div class="common-section" style="width: 100%;">
								<Modal
									{fileId}
									{brandColor}
									{name}
									{borderRadius}
									{allowGitHub}
									{allowTwitter}
									{allowFacebook}
									{allowGoogle}
									{allowGuest}
									{allowMagicUrl}
									{allowPhone}
								/>
							</div>
						</div>
					</section>
				{:else}
					<section class="code-panel u-min-width-100-percent theme-dark">
						<code class="code-panel-content grid-code">
							<div class="grid-code-line-number" />
							<pre>&lt;a href="https://{domain}.authui.site/"&gt;</pre>
							<div class="grid-code-line-number" />
							<pre>    Sign In</pre>
							<div class="grid-code-line-number" />
							<pre>&lt;/a&gt;	</pre>
						</code>
					</section>
				{/if}
			</div>
		</div>
	</div>
</form>
