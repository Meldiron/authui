<script lang="ts">
	export let password = '';

	let visiblePassword = false;
</script>

<div class="input-text-wrapper">
	{#if visiblePassword}
		<input
			bind:value={password}
			id="password"
			placeholder="Password"
			required={true}
			minlength="8"
			type="text"
			class="input-text"
			autocomplete="off"
		/>
	{:else}
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
	{/if}
	<button
		on:click={() => (visiblePassword = !visiblePassword)}
		type="button"
		class="show-password-button"
		aria-label="show password"
		><span aria-hidden="true" class={visiblePassword ? 'icon-eye-off' : 'icon-eye'} /></button
	>
</div>
