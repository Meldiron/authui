<script lang="ts">
	export let borderRadius: 'xs' | 'm' | 'xl' = 'xs';
	// export let brandColor: 'pink' | 'orange' | 'green' | 'blue' | 'red' = 'blue';
	export let name: string = '';

	export let allowGuest: boolean = false;
	export let allowGoogle: boolean = false;
	export let allowGitHub: boolean = false;
	export let allowTwitter: boolean = false;
	export let allowFacebook: boolean = false;
	export let allowPhone: boolean = false;
	export let allowMagicUrl: boolean = false;
</script>

<div
	style={`width: 100%; --c-border-radius: ${
		borderRadius === 'xs' ? '4px' : borderRadius === 'm' ? '12px' : '20px'
	};`}
	class="c-modal u-flex u-flex-vertical u-gap-8"
>
	<button class="button is-text" style="padding: 0px;"
		><span class="icon-cheveron-left" aria-hidden="true" /><span class="text">Back to Website</span
		></button
	>

	<section class="card" style="width: 100%;">
		<div class="u-max-width-500 u-width-full-line">
			<h1 class="heading-level-3 u-margin-block-start-auto">Log in {name ? `to ${name}` : ''}</h1>
			<div class="u-margin-block-start-24">
				<form class="form common-section" data-hs-cf-bound="true">
					<ul class="form-list">
						<li class="form-item u-flex u-flex-vertical u-gap-8">
							{#if allowGoogle || allowGitHub || allowFacebook || allowTwitter}
							<span class="eyebrow-heading-3" style="margin-bottom: 0.3rem;">Social Login</span>
							{/if}

							{#if allowGoogle}
							<button
								style="background-color: #DB4437; color: white; border: none;"
								class="button is-full-width"
								type="button"
								><span class="icon-google" aria-hidden="true" />
								<span class="text">Sign in with Google</span></button
							>
							{/if}

							{#if allowGitHub}
							<button
								style="background-color: #181717; color: white; border: none;"
								class="button is-full-width"
								type="button"
								><span class="icon-github" aria-hidden="true" />
								<span class="text">Sign in with GitHub</span></button
							>
							{/if}

							{#if allowTwitter}
							<button
								style="background-color: #1DA1F2; color: white; border: none;"
								class="button is-full-width"
								type="button"
								><span class="icon-twitter" aria-hidden="true" />
								<span class="text">Sign in with Twitter</span></button
							>
							{/if}

							{#if allowFacebook}
							<button
								style="background-color: #1877F2; color: white; border: none;"
								class="button is-full-width"
								type="button"
								><span class="icon-facebook" aria-hidden="true" />
								<span class="text">Sign in with Facebook</span></button
							>
							{/if}

							{#if allowGoogle || allowGitHub || allowFacebook || allowTwitter}
							<span class="eyebrow-heading-3" style="margin-bottom: 0.3rem; margin-top: 1rem;"
								>Credentials Login</span
							>
							{/if}

							<form class="form" data-hs-cf-bound="true">
								<ul class="form-list">
									<li class="form-item">
										<label class="label is-required" for="email">Email</label>
										<div class="input-text-wrapper">
											<input
												id="email"
												placeholder="Email"
												required={true}
												type="email"
												class="input-text"
												autocomplete="off"
											/>
										</div>
									</li>
									<li class="form-item">
										<label class="label is-required" for="password">Password</label>
										<div class="input-text-wrapper">
											<input
												id="password"
												placeholder="Password"
												required={true}
												minlength="8"
												type="password"
												class="input-text"
												autocomplete="off"
											/>
											<button type="button" class="show-password-button" aria-label="show password"
												><span aria-hidden="true" class="icon-eye" /></button
											>
										</div>
									</li>
									<li class="form-item">
										<button class="button is-full-width" type="submit"
											>Sign in</button
										>
									</li>
								</ul>
							</form>

							{#if allowGuest || allowMagicUrl || allowPhone}
							<div
								style="margin: 1.5rem 0px; border-top: 0.0625rem solid hsl(var(--color-neutral-30));"
							/>
							{/if}

							{#if allowMagicUrl || allowPhone}
							<span class="eyebrow-heading-3" style="margin-bottom: 0.3rem;"
								>Passwordless Login</span
							>
							{/if}

							{#if allowMagicUrl}
							<button class="button is-secondary is-full-width" type="button"
								><span class="icon-mail" aria-hidden="true" />
								<span class="text">Sign in with Email</span></button
							>
							{/if}

							{#if allowPhone}
							<button class="button is-secondary is-full-width" type="button"
								><span class="icon-phone" aria-hidden="true" />
								<span class="text">Sign in with SMS</span></button
							>
							{/if}

							{#if allowGuest}
								<span class="eyebrow-heading-3" style="margin-bottom: 0.3rem; margin-top: 1rem;"
									>Limited account</span
								>

								<button class="is-border-dashed button is-text is-full-width" type="button"
									><span class="icon-anonymous" aria-hidden="true" />
									<span class="text">Sign as Guest</span></button
								>
							{/if}
						</li>
					</ul>
				</form>
			</div>
		</div>
	</section>

	<p
		style="color: hsl(var(--color-neutral-70));"
		class="u-x-small u-margin-block-start-12 u-text-center"
	>
		By joining, you agree to our <a
			class="u-bold"
			href="https://appwrite.io/policy/terms"
			target="_blank">Terms of Service</a
		>
		and
		<a class="u-bold" href="https://appwrite.io/policy/privacy" target="_blank">Privacy Policy</a>
	</p>
</div>
