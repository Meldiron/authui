<script>
	import '@appwrite.io/pink';
	import '@appwrite.io/pink-icons';
</script>

<div class="flex flex-vertical">
	<header class="main-header u-padding-inline-end-0">
		<a class="logo eyebrow-heading-2" href="/"> Auth UI </a>
		<div class="main-header-end u-margin-inline-end-16">
			<ul class="buttons-list is-with-padding">
				<li class="buttons-list-item u-padding-inline-0">
					<button class="button is-secondary"><span aria-hidden="true" class="icon-star"></span><span class="text">Star on GitHub</span></button>
				</li>
			</ul>
		</div>
	</header>
	<div class="main-content">
		<slot />
	</div>
</div>
