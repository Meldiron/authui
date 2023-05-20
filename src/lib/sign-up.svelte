<script lang="ts">
	import { Account, Client, ID } from 'appwrite';

	export let isPreview = false;
	export let getClient: () => Client;
	export let successUrl: string = '';

	let name = '';
	let email = '';
	let password = '';
	let passwordAgain = '';

	let isLoading = false;
	let error = '';

	async function onSubmit() {
		if (isLoading) {
			return;
		}

		isLoading = true;
		error = '';

		try {
			if (password !== passwordAgain) {
				throw new Error('Passwords do not match.');
			}

			const account = new Account(getClient());
			await account.create(ID.unique(), email, password, name);
			await account.createEmailSession(email, password);

			window.location.href = successUrl;
		} catch (err: any) {
			error = err.message;
			isLoading = false;
		}
	}
</script>

<li class="form-item u-flex u-flex-vertical u-gap-8">
	<form on:submit|preventDefault={onSubmit} class="form" data-hs-cf-bound="true">
		<ul class="form-list">
			<li class="form-item">
				<label class="label" for="name">Name</label>
				<div class="input-text-wrapper">
					<input
						bind:value={name}
						id="name"
						placeholder="Name"
						required={true}
						type="text"
						class="input-text"
						autocomplete="off"
					/>
				</div>
			</li>
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
					<button type="button" class="show-password-button" aria-label="show password"
						><span aria-hidden="true" class="icon-eye" /></button
					>
				</div>
			</li>
			<li class="form-item">
				<label class="label is-required" for="passwordAgain">Password Again</label>
				<div class="input-text-wrapper">
					<input
						bind:value={passwordAgain}
						id="passwordAgain"
						placeholder="Password Again"
						required={true}
						minlength="8"
						type="password"
						class="input-text"
						autocomplete="off"
					/>
					<button type="button" class="show-password-button" aria-label="show password"
						><span aria-hidden="true" class="icon-eye" /></button
					>
				</div>
			</li>
			<li class="form-item">
				{#if isLoading}
					<button
						class="button is-text u-flex u-main-center"
						style="width: 100%;"
						disabled={true}
						type="button"
					>
						<div class="loader" />
					</button>
				{:else}
					<button class="c-branded-button button is-full-width" type="submit">Sign Up</button>
				{/if}

				{#if error}
					<div
						class="u-text-center u-bold u-margin-block-start-16"
						style="color: hsl(var(--color-text-danger))"
					>
						<p class="text">{error}</p>
					</div>
				{/if}

				<ul class="inline-links is-center is-with-sep u-margin-block-start-16">
					<li class="inline-links-item">
						<a href={isPreview ? undefined : '/forgot-password'} type="button"><span class="text">Forgot Password?</span></a>
					</li>
					<li class="inline-links-item">
						<a href={isPreview ? undefined : '/'} type="button"><span class="text">Sign In</span></a>
					</li>
				</ul>
			</li>
		</ul>
	</form>
</li>
