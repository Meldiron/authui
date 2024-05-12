<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import ModalWrapper from '$lib/modal-wrapper.svelte';
</script>

<ModalWrapper user={data.user} page={data.page} action="signUp" />
