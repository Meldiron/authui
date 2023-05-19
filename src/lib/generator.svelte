<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { Query, type Models } from 'appwrite';
	import { onMount } from 'svelte';
	import { AppwriteAccount, AppwriteDatabases, type AppwritePage } from './appwrite';
	import Form from './form.svelte';
	import { accountStore } from './stores';

	let myPages: AppwritePage[] = [];
	onMount(async () => {
		if (browser) {
			try {
				$accountStore = await AppwriteAccount.get();
			} catch (err) {
				$accountStore = null;
				console.log(err);
			}

			if ($accountStore) {
				await fetchPages();
			}
		}
	});

	async function fetchPages() {
		try {
			const accountId = $accountStore?.$id ?? '';

			const response = await AppwriteDatabases.listDocuments<AppwritePage>('main', 'pages', [
				Query.limit(100),
				Query.equal('userId', accountId)
			]);

			myPages = response.documents.filter((document) => {
				const permission = document.$permissions.find(
					(permission) =>
						permission.startsWith('update') && permission.includes(`user:${accountId}`)
				);
				return permission ? true : false;
			});

			console.log(myPages);
		} catch (err) {
			console.error(err);
		}
	}

	function editPage() {
		// TODO: Implement editing
		alert('Coming soon..');
	}

	async function deletePage(pageId: string) {
		// TODO: Nicer UI, spinner icon on button, show error if error

		if (confirm('Are you sure you want to delete this page?')) {
			await AppwriteDatabases.deleteDocument('main', 'pages', pageId);
			await fetchPages();
		}
	}
</script>

<div class="flex flex-vertical">
	<header class="main-header u-padding-inline-end-0">
		<a class="logo eyebrow-heading-2" href="/"> Auth UI </a>
		<div class="main-header-end u-margin-inline-end-16">
			<ul class="buttons-list is-with-padding">
				<li class="buttons-list-item">
					<a href="https://github.com/Meldiron/authui" target="_blank" class="button is-secondary"
						><span aria-hidden="true" class="icon-star" /><span class="text">Star on GitHub</span
						></a
					>
				</li>
				{#if $accountStore}
					<li class="buttons-list-item u-padding-inline-0">
						<a href="https://login.authui.site/" class="button is-only-icon is-text"
							><span aria-hidden="true" class="icon-user" /></a
						>
					</li>
				{/if}
			</ul>
		</div>
	</header>
	<div class="main-content">
		<div class="top-cover u-padding-block-end-56">
			<div class="container cover-padding-top-big-screen">
				<div class="u-flex u-gap-16 u-flex-justify-center u-margin-block-start-16">
					<h1 class="heading-level-3">Auth UI | Universal Auth Service</h1>
					<code class="u-un-break-text" />
				</div>
				<p class="body-text-1 u-normal u-margin-block-start-8">
					Fully customizable login flow for your applications. Get started in minutes, not hours!
				</p>
			</div>
		</div>

		<div class="container u-margin-block-start-negative-56">
			{#if myPages.length > 0}
				<table class="table">
					<thead class="table-thead">
						<tr class="table-row">
							<th class="table-thead-col" style="--p-col-width:230">
								<span class="eyebrow-heading-3">Your Pages</span>
							</th>
							<th class="table-thead-col" style="--p-col-width:185">
								<span class="eyebrow-heading-3">Name</span>
							</th>
							<th class="table-thead-col" style="--p-col-width:100">
								<span class="eyebrow-heading-3">Actions</span>
							</th>
						</tr>
					</thead>
					<tbody class="table-tbody">
						{#each myPages as page}
							<tr class="table-row">
								<td class="table-col" data-title="Document ID">
									<a href={`https://${page.domain}.authui.site/`} target="_blank" class="tag">
										<span class="icon-external-link" aria-hidden="true" />
										<span class="text">{page.domain}.authui.site</span>
									</a>
								</td>
								<td class="table-col" data-title="Name"><span class="text">{page.name}</span></td>
								<td data-title="Actions" class="table-col">
									<div class="u-flex u-cross-center u-gap-8">
										<button on:click={editPage} class="button is-secondary" type="button"
											>Edit</button
										>
										<button
											on:click={() => deletePage(page.$id)}
											class="button is-text"
											style="color: hsl(var(--color-danger-100))"
											type="button">Delete</button
										>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}

			<Form on:created={() => fetchPages()} />
		</div>
	</div>
</div>
