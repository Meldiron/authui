<script lang="ts">
	import {
		PUBLIC_AUTHUI_PAGE_ID,
		PUBLIC_HOSTNAME,
		PUBLIC_HOSTNAME_PROTOCOL
	} from '$env/static/public';

	import { accountStore } from './stores';

	export let isSubpage = false;
	export let adminUser: any | null;

	$accountStore = adminUser;
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
						<a
							href={`${PUBLIC_HOSTNAME_PROTOCOL}://${PUBLIC_AUTHUI_PAGE_ID}.${PUBLIC_HOSTNAME}/`}
							class="button is-only-icon is-text"><span aria-hidden="true" class="icon-user" /></a
						>
					</li>
				{/if}
			</ul>
		</div>
	</header>
	<div class="main-content">
		<div class="top-cover u-padding-block-end-56">
			<div class="container cover-padding-top-big-screen">
				{#if isSubpage}
					<a href="/" class="button is-text" style="padding: 0px;"
						><span class="icon-cheveron-left" aria-hidden="true" /><span class="text"
							>Back to Homepage</span
						></a
					>
				{/if}

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
			<slot />
		</div>
	</div>
</div>
