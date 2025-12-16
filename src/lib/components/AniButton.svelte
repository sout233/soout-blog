<script lang="ts">
	import { animate } from 'animejs';
	import { fade } from 'svelte/transition';

	let loginButton: HTMLElement | null = $state(null);
	let { text, href = '#', svgHtml='', className='btn btn-neutral'} = $props();

	function handleLoginButtonEnter() {
		if (loginButton) {
			animate(loginButton, {
				scale: 1.2,
				duration: 600,
				rotate: -5,
				ease: 'outElastic'
			});
		}
	}

	function handleLoginButtonLeave() {
		if (loginButton) {
			animate(loginButton, {
				scale: 1,
				duration: 1000,
				rotate: 0,
				ease: 'outElastic'
			});
		}
	}
</script>

<a
	transition:fade={{ duration: 200 }}
	bind:this={loginButton}
	{href}
	class={className}
	onpointerenter={handleLoginButtonEnter}
	onpointerleave={handleLoginButtonLeave}
>
	{@html svgHtml}

	<p class="">{text}</p>
</a>
