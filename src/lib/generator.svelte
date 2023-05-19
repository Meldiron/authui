<script lang="ts">
	import { Query } from 'appwrite';
	import Layout from '$lib/layout.svelte';
	import { AppwriteDatabases, type AppwritePage } from './appwrite';
	import Form from './form.svelte';
	import { accountStore } from './stores';

	let myPages: AppwritePage[] = [];
	let initFetched = false;
	$: {
		if ($accountStore) {
			if (!initFetched) {
				initFetched = true;
				fetchPages();
			}
		}
	}

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
</script>

<Layout>
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
								<a href={`/pages/${page.$id}/edit`} class="button is-secondary" type="button"
									>Edit</a
								>
								<a href={`/pages/${page.$id}/info`} class="button is-text" type="button">Info</a>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}

	<Form />
</Layout>
