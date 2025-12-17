<script lang="ts">
	import { animate } from 'animejs';
	import { fade } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	let {
		text,
		href = '#',
		icon,
		className = 'btn btn-neutral'
	}: {
		text: string;
		href?: string;
		icon?: Snippet;
		className?: string;
	} = $props();

	let buttonElement: HTMLElement | null = $state(null);

	function handlePointerEnter() {
		if (buttonElement) {
			animate(buttonElement, {
				scale: 1.2,
				duration: 600,
				rotate: -5,
				ease: 'outElastic'
			});
		}
	}

	function handlePointerLeave() {
		if (buttonElement) {
			animate(buttonElement, {
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
	bind:this={buttonElement}
	{href}
	class={className}
	onpointerenter={handlePointerEnter}
	onpointerleave={handlePointerLeave}
>
	{#if icon}
		{@render icon()}
	{/if}

	<p>{text}</p>
</a>
