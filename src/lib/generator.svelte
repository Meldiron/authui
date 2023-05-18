<script lang="ts">
	let provider = 'appwrite';

	let providerProject = '';
	let providerEndpoint = 'https://cloud.appwrite.io/v1';

	let successUrl = '';
	let failureUrl = '';

	let name = '';
	let domain = '';

	let brandColor = 'pink';
	let roundedCorners = 'xs';

	let guest = false;
	let magicUrl = false;
	let phone = false;
	let oauth = false;

    let google = false;
    let github = false;
    let twitter = false;
    let facebook = false;
</script>

<div class="flex flex-vertical">
	<header class="main-header u-padding-inline-end-0">
		<a class="logo eyebrow-heading-2" href="/"> Auth UI </a>
		<div class="main-header-end u-margin-inline-end-16">
			<ul class="buttons-list is-with-padding">
				<li class="buttons-list-item u-padding-inline-0">
					<a href="https://github.com/Meldiron/authui" target="_blank" class="button is-secondary"
						><span aria-hidden="true" class="icon-star" /><span class="text">Star on GitHub</span
						></a
					>
				</li>
			</ul>
		</div>
	</header>
	<div class="main-content">
		<div class="top-cover u-padding-block-end-56">
			<div class="container cover-padding-top-big-screen">
				<div class="u-flex u-gap-16 u-flex-justify-center u-margin-block-start-16">
					<h1 class="heading-level-3">Universal Auth Service</h1>
					<code class="u-un-break-text" />
				</div>
				<p class="body-text-1 u-normal u-margin-block-start-8">
					Fully customizable login flow for your application. Get started in minutes, not hours!
				</p>
			</div>
		</div>

		<div class="container u-margin-block-start-negative-56">
			<article class="card common-section">
				<h6 class="heading-level-7">Generate Page</h6>
				<p class="u-margin-block-start-8">Customize and configure your auth page.</p>

				<div class="card-separator" style="padding-block-start: 1rem;" />

				<div class="common-section grid-1-2">
					<div class="grid-1-2-col-1 u-flex u-flex-vertical u-gap-24">
						<h3 class="heading-level-7">1. Design</h3>
						<div>
							<h3 class="eyebrow-heading-3">Brand Color</h3>

							<div class="u-flex u-flex-wrap u-gap-12 u-margin-block-start-12">
								<button on:click={() => (brandColor = 'pink')}>
									<div class="avatar is-color-pink">
										{#if brandColor === 'pink'}
											<span class="icon-check" aria-hidden="true" />
										{/if}
									</div>
								</button>
								<button on:click={() => (brandColor = 'orange')}>
									<div class="avatar is-color-orange">
										{#if brandColor === 'orange'}
											<span class="icon-check" aria-hidden="true" />
										{/if}
									</div>
								</button>
								<button on:click={() => (brandColor = 'green')}>
									<div class="avatar is-color-green">
										{#if brandColor === 'green'}
											<span class="icon-check" aria-hidden="true" />
										{/if}
									</div>
								</button>
								<button on:click={() => (brandColor = 'blue')}>
									<div class="avatar is-color-blue">
										{#if brandColor === 'blue'}
											<span class="icon-check" aria-hidden="true" />
										{/if}
									</div>
								</button>
								<button on:click={() => (brandColor = 'red')}>
									<div class="avatar is-color-red">
										{#if brandColor === 'red'}
											<span class="icon-check" aria-hidden="true" />
										{/if}
									</div>
								</button>
							</div>
						</div>

						<div>
							<h3 class="eyebrow-heading-3">Rounded Corners</h3>

							<div class="c-mini-radio u-flex u-flex-wrap u-gap-12 u-margin-block-start-12">
								<button
									on:click={() => (roundedCorners = 'xs')}
									class="button is-only-icon is-secondary"
								>
									<input
										style="display: none;"
										type="radio"
										bind:group={roundedCorners}
										name="roundedCorners"
										value="xs"
									/>
									<span class="u-x-small">XS</span>
								</button>
								<button
									on:click={() => (roundedCorners = 'm')}
									class="button is-only-icon is-secondary"
								>
									<input
										style="display: none;"
										type="radio"
										bind:group={roundedCorners}
										name="roundedCorners"
										value="m"
									/>
									<span class="u-x-small">M</span>
								</button>
								<button
									on:click={() => (roundedCorners = 'xl')}
									class="button is-only-icon is-secondary"
								>
									<input
										style="display: none;"
										type="radio"
										bind:group={roundedCorners}
										name="roundedCorners"
										value="xl"
									/>
									<span class="u-x-small">XL</span>
								</button>
							</div>
						</div>

						<h3 class="heading-level-7 u-margin-block-start-16">2. Configure</h3>

						<div>
							<form class="form u-width-full-line u-max-width-500">
								<ul class="form-list">
									<li class="form-item">
										<label class="label" for="name">App Name</label>
										<div class="input-text-wrapper">
											<input
												type="text"
												id="name"
												class="input-text"
												bind:value={name}
												placeholder="My Awesome App"
											/>
										</div>
									</li>
									<li class="form-item c-domain">
										<label class="label" for="domain">Domain</label>
										<div class="input-text-wrapper" style="--amount-of-buttons:2.2">
											<input
												type="text"
												id="domain"
												bind:value={domain}
												placeholder="my-awesome-app"
											/>
											<div class="options-list">
												<button
													class="options-list-button"
													aria-label="show password / hide password"
													type="button"
												>
													.authui.site
												</button>
											</div>
										</div>
									</li>
								</ul>
							</form>
						</div>

						<ul class="form-list">
							<li class="form-item">
								<label class="choice-item" for="magicUrl"
									><div class="input-text-wrapper">
										<input
											bind:checked={guest}
											id="magicUrl"
											type="checkbox"
											class="switch"
											role="switch"
										/>
									</div>
									<div class="choice-item-content">
										<div class="choice-item-title">Guest</div>
										<div class="choice-item-paragraph">
											1-click sign up. User instantly gets account, but they can't sign into it
											later.
										</div>
									</div></label
								>
							</li>
							<li class="form-item">
								<label class="choice-item" for="magicUrl"
									><div class="input-text-wrapper">
										<input
											bind:checked={magicUrl}
											id="magicUrl"
											type="checkbox"
											class="switch"
											role="switch"
										/>
									</div>
									<div class="choice-item-content">
										<div class="choice-item-title">Magic URL</div>
										<div class="choice-item-paragraph">
											Passwordless login. User recieves email and when they visit URL delivered by
											mail, they get logged in.
										</div>
									</div></label
								>
							</li>

							<li class="form-item">
								<label class="choice-item" for="phone"
									><div class="input-text-wrapper">
										<input
											bind:checked={phone}
											id="phone"
											type="checkbox"
											class="switch"
											role="switch"
										/>
									</div>
									<div class="choice-item-content">
										<div class="choice-item-title">Phone</div>
										<div class="choice-item-paragraph">
											SMS login. User recieves phone SMS with a code. To login, they enter 6 digit
											code.
										</div>
									</div></label
								>
							</li>
							<li class="form-item">
								<label class="choice-item" for="oauth"
									><div class="input-text-wrapper">
										<input
											bind:checked={oauth}
											id="oauth"
											type="checkbox"
											class="switch"
											role="switch"
										/>
									</div>
									<div class="choice-item-content">
										<div class="choice-item-title">OAuth</div>
										<div class="choice-item-paragraph">
											Login user using their existing social platform account. User will be
											redirected to autorize.
										</div>

										{#if oauth}
											<div class="u-flex u-flex-vertical u-gap-8">
												<label for="google" class="u-flex u-gap-8">
													<input bind:value={google} type="checkbox" id="google" />
													<div><span class="text">Google</span></div>
												</label>
												<label for="github" class="u-flex u-gap-8">
													<input bind:value={github} type="checkbox" id="github" />
													<div><span class="text">GitHub</span></div>
												</label>
												<label for="twitter" class="u-flex u-gap-8">
													<input bind:value={twitter} type="checkbox" id="twitter" />
													<div><span class="text">Twitter</span></div>
												</label>

												<label for="facebook" class="u-flex u-gap-8">
													<input bind:value={facebook} type="checkbox" id="facebook" />
													<div><span class="text">Facebook</span></div>
												</label>
											</div>
										{/if}
									</div></label
								>
							</li>
						</ul>

						<h3 class="heading-level-7 u-margin-block-start-16">3. Connect</h3>

						<ul
							class="grid-box"
							style="--p-grid-item-size:10em; --p-grid-item-size-small-screens:10rem;"
						>
							<li>
								<label
									class="card is-allow-focus u-height-100-percent u-flex u-flex-vertical u-gap-16 u-cursor-pointer"
									style="--card-padding:0.5rem; padding-bottom: 1rem;"
								>
									<input type="radio" bind:group={provider} name="provider" value="appwrite" />
									<div class="u-flex u-flex-vertical u-gap-12 u-text-center">
										<img
											src="/providers/appwrite.svg"
											width="40"
											height="30"
											class="u-margin-inline-auto"
											alt=""
										/>
										<p>Appwrite</p>
									</div>
								</label>
							</li>

							<li>
								<label
									class="card u-height-100-percent u-flex u-flex-vertical u-gap-16"
									style="--card-padding:0.5rem; padding-bottom: 1rem;"
								>
									<input
										type="radio"
										name="provider"
										disabled
										value="supabase"
										bind:group={provider}
									/>
									<div class="u-flex u-flex-vertical u-gap-12 u-text-center">
										<img
											src="/providers/supabase.svg"
											width="30"
											height="30"
											class="u-margin-inline-auto u-opacity-20"
											alt=""
										/>
										<p class="u-opacity-20">Coming Soon</p>
									</div>
								</label>
							</li>
						</ul>

						<form class="form u-width-full-line u-max-width-500">
							<ul class="form-list">
								<li class="form-item">
									<label class="label" for="endpoint">Endpoint</label>
									<div class="input-text-wrapper">
										<input
											type="text"
											id="endpoint"
											class="input-text"
											bind:value={providerEndpoint}
											placeholder="https://.../v1"
										/>
									</div>
								</li>
								<li class="form-item">
									<label class="label" for="projectId">Project ID</label>
									<div class="input-text-wrapper">
										<input
											type="text"
											id="projectId"
											class="input-text"
											bind:value={providerProject}
											placeholder="6465dc0c4b.........."
										/>
									</div>
								</li>
							</ul>
						</form>

						<h3 class="heading-level-7 u-margin-block-start-16">4. Redirect</h3>

						<form class="form u-width-full-line u-max-width-500">
							<ul class="form-list">
								<li class="form-item">
									<label class="label" for="successUrl">Success URL</label>
									<div class="input-text-wrapper">
										<input
											type="text"
											id="successUrl"
											class="input-text"
											bind:value={successUrl}
											placeholder="https://..."
										/>
									</div>
								</li>
								<li class="form-item">
									<label class="label" for="failureUrl">Failure URL</label>
									<div class="input-text-wrapper">
										<input
											type="text"
											id="failureUrl"
											class="input-text"
											bind:value={failureUrl}
											placeholder="https://..."
										/>
									</div>
								</li>
							</ul>
						</form>

						<div>
							<button class="button"><span class="text">Create Auth Page</span></button>
						</div>
					</div>
					<div class="grid-1-2-col-2 u-flex u-flex-vertical u-gap-24">
						<h3 class="heading-level-4 u-text-center">Preview</h3>
						<article
							class="card u-grid u-cross-center u-width-full-line dashed"
							style="background-color: hsl(var(--p-body-bg-color)); position: sticky; top: 6rem;"
						>
							<div class="u-flex u-cross-center u-flex-vertical u-main-center u-flex">
								<div class="common-section">
									<span class="text">Work in Progress</span>
								</div>
							</div>
						</article>
					</div>
				</div>
			</article>
		</div>
	</div>
</div>
