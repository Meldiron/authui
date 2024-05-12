<script lang="ts">
	import { PUBLIC_HOSTNAME, PUBLIC_HOSTNAME_PROTOCOL } from '$env/static/public';
	import Layout from '$lib/layout.svelte';
	import Form from './form.svelte';

	export let adminUser: any | null;
	export let adminPages: any[] = [];
</script>

<Layout {adminUser}>
	{#if adminPages.length > 0}
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
				{#each adminPages as page}
					<tr class="table-row">
						<td class="table-col" data-title="Document ID">
							<a
								href={`${PUBLIC_HOSTNAME_PROTOCOL}://${page.domain}.${PUBLIC_HOSTNAME}/`}
								target="_blank"
								class="tag"
							>
								<span class="icon-external-link" aria-hidden="true" />
								<span class="text">{page.domain}.{PUBLIC_HOSTNAME}</span>
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
