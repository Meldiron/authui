<script lang="ts">
	import { goto } from '$app/navigation';
	import { Account, Client, ID } from 'appwrite';
	import Password from './components/password.svelte';

	export let getClient: () => Client;

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
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);

			const userId = urlParams.get('userId') ?? '';
			const secret = urlParams.get('secret') ?? '';

			if (password !== passwordAgain) {
				throw new Error('Passwords do not match.');
			}

			const account = new Account(getClient());
			await account.updateRecovery(userId, secret, password);

			goto('/');
		} catch (err: any) {
			error = err.message;
			isLoading = false;
		}
	}

	let visiblePassword = false;
</script>

<li class="form-item u-flex u-flex-vertical u-gap-8">
	<form on:submit|preventDefault={onSubmit} class="form" data-hs-cf-bound="true">
		<ul class="form-list">
			<li class="form-item">
				<label class="label is-required" for="password">Password</label>
				<Password bind:password />
			</li>
			<li class="form-item">
				<label class="label is-required" for="passwordAgain">Password Again</label>
				<Password bind:password={passwordAgain} />
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
					<button class="c-branded-button button is-full-width" type="submit">Update</button>
				{/if}

				{#if error}
					<div
						class="u-text-center u-bold u-margin-block-start-16"
						style="color: hsl(var(--color-text-danger))"
					>
						<p class="text">{error}</p>
					</div>
				{/if}
			</li>
		</ul>
	</form>
</li>
