<script lang="ts">
	import { browser } from '$app/environment';
	import { Account, Client, ID } from 'appwrite';
	import { onMount } from 'svelte';

	export let getClient: () => Client;
	export let successUrl: string = '';

	let isLoading = false;
	let error = '';

	onMount(async () => {
		if (browser) {
			isLoading = true;
			error = '';

			try {
				const queryString = window.location.search;
				const urlParams = new URLSearchParams(queryString);

				const userId = urlParams.get('userId') ?? '';
				const secret = urlParams.get('secret') ?? '';

				const account = new Account(getClient());
				await account.updateMagicURLSession(userId, secret);

				window.location.href = successUrl;
			} catch (err: any) {
				error = err.message;
				isLoading = false;
			}
		}
	});
</script>

<li class="form-item u-flex u-flex-vertical u-gap-8">
	<div class="form" data-hs-cf-bound="true">
		<ul class="form-list">
			{#if isLoading}
				<li class="form-item">
					<button
						class="button is-text u-flex u-main-center"
						style="width: 100%;"
						disabled={true}
						type="button"
					>
						<div class="loader" />
					</button>
				</li>
			{/if}
			<li class="form-item">
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
						<a href="/" type="button"><span class="text">Try Again</span></a>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</li>
