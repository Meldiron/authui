<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Form from '$lib/form.svelte';
	import Layout from '$lib/layout.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Layout isSubpage={true} adminUser={data.adminUser}>
	<Form page={data.page} />
</Layout>
